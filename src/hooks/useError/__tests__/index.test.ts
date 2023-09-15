import * as Sentry from "@sentry/nextjs";
import { act, renderHook } from "@testing-library/react";
import { useError } from "..";

jest.mock("@sentry/nextjs"); // <= auto-mock @sentry/nextjs

const throwError = (error: Error) => {
  Sentry.captureException(error);
};

describe("Sentry", () => {
  test("captureException", () => {
    const error = new Error("My Error");
    throwError(error);

    expect(Sentry.captureException).toHaveBeenCalledWith(error);
  });

  it("should throwMessage", () => {
    const { result } = renderHook(() => useError());
    const error = new Error("My Message");
    act(() => result.current.throwMessage(error));
    expect(Sentry.captureMessage).toHaveBeenCalledWith(error.message);
  });
});
