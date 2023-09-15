import * as Sentry from "@sentry/nextjs";

export function useError() {
  const throwError = (error: Error) => {
    Sentry.captureException(error);
    throw error;
  };

  const throwMessage = (error: Error) => {
    Sentry.captureMessage(error.message);
  };

  return {
    throwError,
    throwMessage,
  };
}
