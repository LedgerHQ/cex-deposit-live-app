import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "@/middleware/utils/types";
import { getAppConfig } from "@/middleware/utils";

export const withMaintenance: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    await next(request, _next);

    const appConfig = await getAppConfig();

    if (!appConfig || !appConfig.enabled) {
      request.nextUrl.pathname = `/maintenance`;

      return NextResponse.rewrite(request.nextUrl);
    }
  };
};
