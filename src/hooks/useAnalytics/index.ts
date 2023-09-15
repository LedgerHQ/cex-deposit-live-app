import { useCallback, useEffect, useMemo } from "react";
import * as Sentry from "@sentry/browser";
import { AnalyticsBrowser } from "@segment/analytics-next";
import { useUserId, useWalletInfo } from "@ledgerhq/wallet-api-client-react";

// Hardcoded for confidentiality
const analyticsOptions = {
  ip: "0.0.0.0",
};
export const live_app = "cex-deposit";
export const live_app_version = "v0";

let analytics: AnalyticsBrowser | undefined;

export const clearAnalytics = () => {
  analytics = undefined;
};

export const enum TrackEvents {
  buttonClicked = "button_clicked",
}

export const enum TackedPages {
  dashboard = "dashboard",
}

export enum PageType {
  page = "page",
  modal = "modal",
  drawer = "drawer",
}

type TrackingTrack = (eventName: TrackEvents, eventProperties?: Record<string, unknown>) => void;
type TrackingPage = (
  pageName: TackedPages,
  eventProperties?: Record<string, unknown>,
  type?: PageType,
) => void;

export function useAnalytics(): {
  track: TrackingTrack;
  page: TrackingPage;
} {
  const {
    userId,
    error: errorUserId,
    loading: loadingId,
    updateData: updateDataUseUserId,
  } = useUserId();
  const {
    walletInfo,
    error: errorWalletInfo,
    loading: loadingInfo,
    updateData: updateDataUseWalletInfo,
  } = useWalletInfo();

  const extraProperties = useMemo(() => {
    return {
      live_app,
      live_app_version,
      userId,
    };
  }, [userId]);

  const identify = useCallback(() => {
    if (!analytics) return;

    analytics.identify(userId, extraProperties, analyticsOptions);
  }, [userId, extraProperties]);

  useEffect(() => {
    function startAnalytics() {
      const setupAnalytics = !loadingId && !loadingInfo && walletInfo && userId;

      if (setupAnalytics && !analytics) {
        const walletName = walletInfo.wallet.name;

        const writeKey: string | undefined =
          walletName === "ledger-live-mobile"
            ? process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY_MOBILE
            : process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY_DESKTOP;

        if (walletInfo.tracking && writeKey) {
          analytics = AnalyticsBrowser.load(
            {
              writeKey,
            },
            { disableClientPersistence: true },
          );
          identify();
        }
      }

      if (errorWalletInfo || errorUserId) {
        Sentry.captureException(
          new Error("Analytics couldn't start because of errorWalletInfo or errorUserId "),
        );
      }
    }
    startAnalytics();
  }, [
    errorUserId,
    errorWalletInfo,
    identify,
    loadingId,
    loadingInfo,
    updateDataUseUserId,
    updateDataUseWalletInfo,
    userId,
    walletInfo,
  ]);

  const track = useCallback<TrackingTrack>(
    (eventName, eventProperties) => {
      if (!analytics) return;

      const allProperties = {
        ...eventProperties,
        ...extraProperties,
      };

      analytics.track(eventName, allProperties, analyticsOptions);
    },
    [extraProperties],
  );

  const page = useCallback<TrackingPage>(
    (pageName, eventProperties, type = PageType.page) => {
      if (!analytics) return;

      const allProperties = {
        ...eventProperties,
        ...extraProperties,
        type,
      };
      const category = live_app;
      analytics.page(category, pageName, allProperties, analyticsOptions);
    },
    [extraProperties],
  );

  return {
    track,
    page,
  };
}
