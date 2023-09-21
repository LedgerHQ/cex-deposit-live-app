import { NextMiddleware } from "next/server";

/**
 * Middleware util types.
 */
export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

/**
 * Edge Config util types.
 */
export type LiveAppConfig = {
  enabled: boolean;
};
