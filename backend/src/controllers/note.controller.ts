import type { Request, Response } from "express";
import { AppError } from "../utils/app-error";
import { recordActivity } from "../services/activity.service";
import type { ApiResponse } from "../types/api.types";

export const addNote = async (req: Request, res: Response<ApiResponse<null>>): Promise<void> => {
  const note = req.body.note;
  const leadId = req.params.id as string;
  
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  if (typeof note !== "string" || !note.trim()) {
    throw new AppError("Note cannot be empty", 400);
  }

  await recordActivity({
    leadId,
    actorId: req.user.id,
    actorName: req.user.name,
    type: "note_added",
    meta: { note: note.trim() },
  });

  res.status(201).json({
    success: true,
    message: "Note added",
  });
};
