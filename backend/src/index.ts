import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db";
import { getEnvConfig } from "./config/env";
import { errorHandler, notFound } from "./middlewares/error.middleware";
import routes from "./routes";

dotenv.config();

const startServer = async (): Promise<void> => {
  const app = express();
  const { port } = getEnvConfig();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.status(200).json({
      success: true,
      message: "GigFlow API is healthy",
    });
  });

  app.use("/api", routes);
  app.use(notFound);
  app.use(errorHandler);

  await connectDB();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

void startServer().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Failed to start server";
  console.error(message);
  process.exit(1);
});
