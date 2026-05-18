import { api } from "../lib/api";
import type { ApiResponse } from "../types/api.types";

export interface DashboardStats {
  totalLeads: number;
  byStatus: Record<string, number>;
  bySource: Record<string, number>;
  leadsOverTime: Array<{ date: string; count: number }>;
  conversionRate: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const res = await api.get<ApiResponse<DashboardStats>>("/stats");
  return res.data.data!;
}
