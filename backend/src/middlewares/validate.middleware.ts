import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

interface ParsedRequestParts {
  body?: unknown;
  query?: unknown;
  params?: unknown;
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
        req.body = parsed.body;
      }

      if (parsed.query !== undefined) {
        req.query = parsed.query as Request["query"];
      }

      if (parsed.params !== undefined) {
        req.params = parsed.params as Request["params"];
      }

      next();
    } catch (error) {
      next(error);
    }
  };
