import type { IncomingMessage, ServerResponse } from "node:http";
import type { Express } from "express";
import { createApp } from "../server/app";
import { registerRoutes } from "../server/routes";
import { errorHandler } from "../server/middleware/errorHandler";

let appPromise: Promise<Express> | null = null;

async function getApp(): Promise<Express> {
  if (!appPromise) {
    appPromise = (async () => {
      const app = createApp();
      await registerRoutes(app);
      app.use(errorHandler);
      return app;
    })();
  }

  return appPromise;
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const app = await getApp();
  app(req, res);
}
