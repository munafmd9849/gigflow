import type { Request, Response } from "express";
import { LeadModel } from "../models/lead.model";
import type { ApiResponse } from "../types/api.types";

export const getDashboardStats = async (req: Request, res: Response<ApiResponse<any>>): Promise<void> => {
  const [totalLeads, byStatusRaw, bySourceRaw, leadsOverTimeRaw] = await Promise.all([
    LeadModel.countDocuments(),
    LeadModel.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    LeadModel.aggregate([{ $group: { _id: "$source", count: { $sum: 1 } } }]),
    LeadModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 30 },
    ]),
  ]);

  const byStatus: Record<string, number> = { New: 0, Contacted: 0, Qualified: 0, Lost: 0 };
  byStatusRaw.forEach((stat) => {
    byStatus[stat._id as string] = stat.count;
  });

  const bySource: Record<string, number> = { Website: 0, Instagram: 0, Referral: 0 };
  bySourceRaw.forEach((stat) => {
    bySource[stat._id as string] = stat.count;
  });

  const leadsOverTime = leadsOverTimeRaw.map((stat) => ({
    date: stat._id as string,
    count: stat.count as number,
  }));

  const qualifiedCount = byStatus["Qualified"] || 0;
  const conversionRate = totalLeads > 0 ? Math.round((qualifiedCount / totalLeads) * 100) : 0;

  res.status(200).json({
    success: true,
    message: "Stats fetched successfully",
    data: {
      totalLeads,
      byStatus,
      bySource,
      leadsOverTime,
      conversionRate,
    },
  });
};
