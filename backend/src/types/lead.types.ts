import type { Types } from "mongoose";

export enum LeadStatus {
  New = "New",
  Contacted = "Contacted",
  Qualified = "Qualified",
  Lost = "Lost",
}

export enum LeadSource {
  Website = "Website",
  Instagram = "Instagram",
  Referral = "Referral",
}

export enum LeadSort {
  Latest = "latest",
  Oldest = "oldest",
}

export interface Lead {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
}

export interface LeadDocument extends Lead {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadResponse extends Lead {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadListQuery {
  page: number;
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort: LeadSort;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}
