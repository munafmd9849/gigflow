import { api } from "../lib/api";
import type { ApiResponse } from "../types/api.types";
import type { Lead, LeadFilters, LeadInput, LeadListResponse, UpdateLeadInput, LeadDetailResponse } from "../types/lead.types";

interface LeadData {
  lead: Lead;
}

interface LeadListData {
  leads: Lead[];
}

interface LeadListApiResponse extends ApiResponse<LeadListData> {
  pagination: LeadListResponse["pagination"];
}

export const getLeads = async (filters: LeadFilters): Promise<LeadListResponse> => {
  const response = await api.get<LeadListApiResponse>("/leads", {
    params: buildLeadParams(filters),
  });

  return {
    leads: response.data.data.leads,
    pagination: response.data.pagination,
  };
};

export const getLead = async (leadId: string): Promise<Lead> => {
  const response = await api.get<ApiResponse<LeadData>>(`/leads/${leadId}`);
  return response.data.data.lead;
};

export const createLead = async (input: LeadInput): Promise<Lead> => {
  const response = await api.post<ApiResponse<LeadData>>("/leads", input);
  return response.data.data.lead;
};

export const updateLead = async (leadId: string, input: UpdateLeadInput): Promise<Lead> => {
  const response = await api.patch<ApiResponse<LeadData>>(`/leads/${leadId}`, input);
  return response.data.data.lead;
};

export const deleteLead = async (leadId: string): Promise<void> => {
  await api.delete(`/leads/${leadId}`);
};

export const exportCsv = async (): Promise<Blob> => {
  const response = await api.get<Blob>("/leads/export/csv", {
    responseType: "blob",
  });

  return response.data;
};

export const getLeadDetail = async (id: string): Promise<LeadDetailResponse> => {
  const response = await api.get<ApiResponse<LeadDetailResponse>>(`/leads/${id}`);
  return response.data.data!;
};

export const addNote = async (id: string, note: string): Promise<void> => {
  await api.post(`/leads/${id}/notes`, { note });
};


const buildLeadParams = (filters: LeadFilters): Record<string, string | number> => {
  const params: Record<string, string | number> = {
    page: filters.page,
    sort: filters.sort,
  };

  if (filters.status) {
    params.status = filters.status;
  }

  if (filters.source) {
    params.source = filters.source;
  }

  if (filters.search?.trim()) {
    params.search = filters.search.trim();
  }

  return params;
};
