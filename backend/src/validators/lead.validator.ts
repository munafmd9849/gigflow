import { z } from "zod";
import { LeadSort, LeadSource, LeadStatus } from "../types/lead.types";

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid lead id");

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
    email: z.email("Invalid email address").toLowerCase(),
    status: z.enum(LeadStatus).default(LeadStatus.New),
    source: z.enum(LeadSource),
  }),
});

export const updateLeadSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z
    .object({
      name: z.string().trim().min(2, "Name must be at least 2 characters").max(120).optional(),
      email: z.email("Invalid email address").toLowerCase().optional(),
      status: z.enum(LeadStatus).optional(),
      source: z.enum(LeadSource).optional(),
    })
    .refine((body) => Object.keys(body).length > 0, "At least one field is required"),
});

export const leadIdParamSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const listLeadsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    status: z.enum(LeadStatus).optional(),
    source: z.enum(LeadSource).optional(),
    search: z.string().trim().min(1).optional(),
    sort: z.enum(LeadSort).default(LeadSort.Latest),
  }),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>["body"];
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>["body"];
export type ListLeadsQueryInput = z.infer<typeof listLeadsSchema>["query"];
