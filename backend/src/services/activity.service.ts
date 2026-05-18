import { Types } from "mongoose";
import { LeadActivity, type ActivityType, type ILeadActivity } from "../models/leadActivity.model";

export interface RecordActivityParams {
  leadId: string | Types.ObjectId;
  actorId: string | Types.ObjectId;
  actorName: string;
  type: ActivityType;
  meta?: {
    field?: string;
    from?: string;
    to?: string;
    note?: string;
  };
}

export const recordActivity = async (params: RecordActivityParams): Promise<void> => {
  await LeadActivity.create(params);
};

export const getLeadActivity = async (leadId: string | Types.ObjectId): Promise<ILeadActivity[]> => {
  return LeadActivity.find({ leadId }).sort({ createdAt: -1 }).limit(50).lean();
};
