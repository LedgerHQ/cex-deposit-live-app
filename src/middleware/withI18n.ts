import { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";
import { I18nMiddleware } from "@/i18n/middleware";
import { MiddlewareFactory } from "@/middleware/utils/types";

export const withI18n: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    await next(request, _next);
    return I18nMiddleware(request);
  };
};
