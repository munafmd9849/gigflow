export const leadStatuses = ["New", "Contacted", "Qualified", "Lost"] as const;
export const leadSources = ["Website", "Instagram", "Referral"] as const;
export const leadSortOptions = ["latest", "oldest"] as const;

export type LeadStatus = (typeof leadStatuses)[number];
export type LeadSource = (typeof leadSources)[number];
export type LeadSort = (typeof leadSortOptions)[number];

export interface Lead {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMetadata {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface LeadListResponse {
  leads: Lead[];
  pagination: PaginationMetadata;
}

export interface LeadFilters {
  page: number;
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort: LeadSort;
}

export interface LeadInput {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
}

export type UpdateLeadInput = Partial<LeadInput>;

export type ActivityType =
  | "lead_created"
  | "status_changed"
  | "source_changed"
  | "field_updated"
  | "note_added";

export interface LeadActivity {
  _id: string;
  leadId: string;
  actorId: string;
  actorName: string;
  type: ActivityType;
  meta: {
    field?: string;
    from?: string;
    to?: string;
    note?: string;
  };
  createdAt: string;
}

export interface LeadDetailResponse {
  lead: Lead;
  activity: LeadActivity[];
}
