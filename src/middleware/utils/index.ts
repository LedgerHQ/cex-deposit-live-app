import { NextMiddleware, NextResponse } from "next/server";

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

/**
 * @dev Utils function in order to chain middlewares.
 */
export function chain(functions: MiddlewareFactory[] = [], index = 0): NextMiddleware {
  const current = functions[index];
  if (current) {
    const next = chain(functions, index + 1);
    return current(next);
  }
  return () => NextResponse.next();
}
