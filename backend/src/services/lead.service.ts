import type { SortOrder } from "mongoose";
import { LeadModel } from "../models/lead.model";
import { LeadSort, type LeadListQuery, type LeadResponse, type PaginationMeta } from "../types/lead.types";
import type { LeadSource, LeadStatus } from "../types/lead.types";
import { AppError } from "../utils/app-error";
import { buildCsv } from "../utils/csv";
import { toLeadResponse } from "../utils/lead-response";
import type { CreateLeadInput, UpdateLeadInput } from "../validators/lead.validator";

interface LeadListResult {
  leads: LeadResponse[];
  pagination: PaginationMeta;
}

interface LeadFilter {
  status?: LeadStatus;
  source?: LeadSource;
  $or?: Array<{ name: RegExp } | { email: RegExp }>;
}

const LEAD_PAGE_LIMIT = 10;

export const createLead = async (input: CreateLeadInput): Promise<LeadResponse> => {
  const lead = await LeadModel.create(input);

  return toLeadResponse(lead);
};

export const getLeads = async (query: LeadListQuery): Promise<LeadListResult> => {
  const filter = buildLeadFilter(query);
  const skip = (query.page - 1) * LEAD_PAGE_LIMIT;
  const sort = buildLeadSort(query.sort);

  const [leads, total] = await Promise.all([
    LeadModel.find(filter).sort(sort).skip(skip).limit(LEAD_PAGE_LIMIT),
    LeadModel.countDocuments(filter),
  ]);

  return {
    leads: leads.map(toLeadResponse),
    pagination: {
      page: query.page,
      limit: LEAD_PAGE_LIMIT,
      total,
      pages: Math.ceil(total / LEAD_PAGE_LIMIT),
    },
  };
};

export const getLeadById = async (leadId: string): Promise<LeadResponse> => {
  const lead = await LeadModel.findById(leadId);

  if (!lead) {
    throw new AppError("Lead not found", 404);
  }

  return toLeadResponse(lead);
};

export const updateLeadById = async (leadId: string, input: UpdateLeadInput): Promise<LeadResponse> => {
  const lead = await LeadModel.findByIdAndUpdate(leadId, input, {
    new: true,
    runValidators: true,
  });

  if (!lead) {
    throw new AppError("Lead not found", 404);
  }

  return toLeadResponse(lead);
};

export const deleteLeadById = async (leadId: string): Promise<void> => {
  const lead = await LeadModel.findByIdAndDelete(leadId);

  if (!lead) {
    throw new AppError("Lead not found", 404);
  }
};

export const exportLeadsCsv = async (): Promise<string> => {
  const leads = await LeadModel.find().sort({ createdAt: -1 });

  return buildCsv(
    ["ID", "Name", "Email", "Status", "Source", "Created At", "Updated At"],
    leads.map((lead) => [
      lead._id.toString(),
      lead.name,
      lead.email,
      lead.status,
      lead.source,
      lead.createdAt,
      lead.updatedAt,
    ]),
  );
};

const buildLeadFilter = (query: LeadListQuery): LeadFilter => {
  const filter: LeadFilter = {};

  if (query.status) {
    filter.status = query.status;
  }

  if (query.source) {
    filter.source = query.source;
  }

  if (query.search) {
    const searchRegex = new RegExp(query.search, "i");
    filter.$or = [{ name: searchRegex }, { email: searchRegex }];
  }

  return filter;
};

const buildLeadSort = (sort: LeadSort): Record<string, SortOrder> => {
  return {
    createdAt: sort === LeadSort.Oldest ? 1 : -1,
  };
};
