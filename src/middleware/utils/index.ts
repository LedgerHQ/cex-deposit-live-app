import { LiveAppConfig, MiddlewareFactory } from "@/middleware/utils/types";
import { get } from "@vercel/edge-config";
import { NextMiddleware, NextResponse } from "next/server";
import PackageJson from "~/package.json";

/**
 * Utils function in order to chain middlewares.
 */
export function chain(functions: MiddlewareFactory[] = [], index = 0): NextMiddleware {
  const current = functions[index];
  if (current) {
    const next = chain(functions, index + 1);
    return current(next);
  }
  return () => NextResponse.next();
}

/**
 * Get live app config from the Edge Config.
 */
export const getAppConfig = async (): Promise<LiveAppConfig | undefined> => {
  return await get(PackageJson.name);
};
