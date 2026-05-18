import type { Request, Response } from "express";
import {
  createLead,
  deleteLeadById,
  exportLeadsCsv,
  getLeadById,
  getLeads,
  updateLeadById,
} from "../services/lead.service";
import type { ApiResponse } from "../types/api.types";
import type { LeadListQuery, LeadResponse, PaginationMeta } from "../types/lead.types";
import { AppError } from "../utils/app-error";
import type { CreateLeadInput, UpdateLeadInput } from "../validators/lead.validator";
import { getLeadActivity, recordActivity } from "../services/activity.service";

interface LeadIdParams {
  id: string;
}

interface LeadListData {
  leads: LeadResponse[];
}

export const create = async (req: Request, res: Response<ApiResponse<{ lead: LeadResponse }>>): Promise<void> => {
  const lead = await createLead(req.body as CreateLeadInput);

  if (req.user) {
    await recordActivity({
      leadId: lead.id,
      actorId: req.user.id,
      actorName: req.user.name,
      type: "lead_created",
      meta: { to: lead.name },
    });
  }

  res.status(201).json({
    success: true,
    message: "Lead created successfully",
    data: { lead },
  });
};

export const list = async (
  req: Request,
  res: Response<ApiResponse<LeadListData> & { pagination: PaginationMeta }>,
): Promise<void> => {
  const result = await getLeads(req.query as unknown as LeadListQuery);

  res.status(200).json({
    success: true,
    message: "Leads fetched successfully",
    data: {
      leads: result.leads,
    },
    pagination: result.pagination,
  });
};

export const getById = async (req: Request, res: Response<ApiResponse<any>>): Promise<void> => {
  const leadId = getLeadId(req.params);
  const [lead, activity] = await Promise.all([
    getLeadById(leadId),
    getLeadActivity(leadId)
  ]);

  res.status(200).json({
    success: true,
    message: "Lead fetched successfully",
    data: { lead, activity },
  });
};

export const update = async (req: Request, res: Response<ApiResponse<{ lead: LeadResponse }>>): Promise<void> => {
  const leadId = getLeadId(req.params);
  const existingLead = await getLeadById(leadId);
  const lead = await updateLeadById(leadId, req.body as UpdateLeadInput);

  if (req.user) {
    const fields: Array<"status" | "source" | "name" | "email"> = ["status", "source", "name", "email"];
    for (const field of fields) {
      if (req.body[field] !== undefined && existingLead[field] !== req.body[field]) {
        let type: "status_changed" | "source_changed" | "field_updated" = "field_updated";
        if (field === "status") type = "status_changed";
        else if (field === "source") type = "source_changed";

        await recordActivity({
          leadId,
          actorId: req.user.id,
          actorName: req.user.name,
          type,
          meta: {
            field,
            from: existingLead[field],
            to: req.body[field],
          },
        });
      }
    }
  }

  res.status(200).json({
    success: true,
    message: "Lead updated successfully",
    data: { lead },
  });
};

export const remove = async (req: Request, res: Response<ApiResponse<never>>): Promise<void> => {
  await deleteLeadById(getLeadId(req.params));

  res.status(200).json({
    success: true,
    message: "Lead deleted successfully",
  });
};

export const exportCsv = async (_req: Request, res: Response): Promise<void> => {
  const csv = await exportLeadsCsv();

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="leads.csv"');
  res.status(200).send(csv);
};

const getLeadId = (params: Request["params"]): string => {
  const id = params.id;

  if (typeof id !== "string" || !id) {
    throw new AppError("Lead id is required", 400);
  }

  return id;
};
