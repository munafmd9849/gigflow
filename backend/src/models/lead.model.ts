import { model, Schema } from "mongoose";
import { LeadSource, LeadStatus, type LeadDocument } from "../types/lead.types";

const leadSchema = new Schema<LeadDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(LeadStatus),
      default: LeadStatus.New,
      required: true,
      index: true,
    },
    source: {
      type: String,
      enum: Object.values(LeadSource),
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

leadSchema.index({ name: 1, email: 1 });

export const LeadModel = model<LeadDocument>("Lead", leadSchema);
