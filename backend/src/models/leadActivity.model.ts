import { model, Schema, Types } from "mongoose";

export type ActivityType =
  | "lead_created"
  | "status_changed"
  | "source_changed"
  | "field_updated"
  | "note_added";

export interface ILeadActivity {
  _id?: Types.ObjectId;
  leadId: Types.ObjectId;
  actorId: Types.ObjectId;
  actorName: string;
  type: ActivityType;
  meta?: {
    field?: string;
    from?: string;
    to?: string;
    note?: string;
  };
  createdAt?: Date;
}

const leadActivitySchema = new Schema<ILeadActivity>(
  {
    leadId: {
      type: Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
      index: true,
    },
    actorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    actorName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "lead_created",
        "status_changed",
        "source_changed",
        "field_updated",
        "note_added",
      ],
      required: true,
    },
    meta: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const LeadActivity = model<ILeadActivity>("LeadActivity", leadActivitySchema);
