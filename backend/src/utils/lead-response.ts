import type { LeadDocument, LeadResponse } from "../types/lead.types";

export const toLeadResponse = (lead: LeadDocument): LeadResponse => {
  return {
    id: lead._id.toString(),
    name: lead.name,
    email: lead.email,
    status: lead.status,
    source: lead.source,
    createdAt: lead.createdAt,
    updatedAt: lead.updatedAt,
  };
};
