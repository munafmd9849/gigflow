import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

interface ParsedRequestParts {
  body?: unknown;
  query?: Record<string, unknown>;
  params?: Record<string, string>;
}

export const validateRequest =
  (schema: ZodType) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = (await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })) as ParsedRequestParts;

      if (parsed.body !== undefined) {
        Object.assign(req.body, parsed.body);
      }

      if (parsed.query !== undefined) {
        Object.assign(req.query, parsed.query);
      }

      if (parsed.params !== undefined) {
        Object.assign(req.params, parsed.params);
      }

      next();
    } catch (error) {
      next(error);
    }
  };