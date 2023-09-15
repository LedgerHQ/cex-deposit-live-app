import { renderHook, waitFor } from "@testing-library/react";
import {
  useAnalytics,
  TrackEvents,
  TackedPages,
  live_app_version,
  live_app,
  PageType,
  clearAnalytics,
} from "@/hooks/useAnalytics";

import { AnalyticsBrowser } from "@segment/analytics-next";
import { mockUseWalletInfo, mockUseWalletInfoData } from "@/tools/mocks/walletInfo.mock";
import { TEST_USER_ID } from "@/tools/mocks/userId.mock";

describe("useAnalytics", () => {
  const mockTrack = jest.fn();
  const mockTrackPage = jest.fn();
  const mockIdentify = jest.fn();

  const mockAnalyticsLoad = jest.fn().mockReturnValue({
    track: mockTrack,
    page: mockTrackPage,
    identify: mockIdentify,
  });

  beforeEach(() => {
    clearAnalytics();
    jest.spyOn(AnalyticsBrowser, "load").mockImplementation(mockAnalyticsLoad);
  });

  describe("sets up analytics correctly", () => {
    it("sets up desktop analytics correctly", () => {
      renderHook(() => useAnalytics());

      expect(mockAnalyticsLoad).toHaveBeenCalledWith(
        expect.objectContaining({
          writeKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY_DESKTOP,
        }),
        expect.objectContaining({ disableClientPersistence: true }),
      );

      expect(mockIdentify).toHaveBeenCalledWith(TEST_USER_ID, expect.anything(), expect.anything());
    });

    it("sets up mobile analytics correctly", () => {
      mockUseWalletInfo.mockReturnValueOnce({
        ...mockUseWalletInfoData,
        walletInfo: {
          ...mockUseWalletInfoData.walletInfo,
          wallet: {
            name: "ledger-live-mobile",
            version: "",
          },
        },
      });

      renderHook(() => useAnalytics());

      expect(mockAnalyticsLoad).toHaveBeenCalledWith(
        expect.objectContaining({
          writeKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY_MOBILE,
        }),
        expect.objectContaining({ disableClientPersistence: true }),
      );

      expect(mockIdentify).toHaveBeenCalledWith(TEST_USER_ID, expect.anything(), expect.anything());
    });
  });

  describe("calls anlytics functions", () => {
    it("calls track with correct details", async () => {
      const { result } = renderHook(() => useAnalytics());

      await waitFor(() => {
        expect(mockAnalyticsLoad).toHaveBeenCalled();
      });

      result.current.track(TrackEvents.buttonClicked, { button: "Home" });
      expect(mockTrack).toHaveBeenCalledWith(
        TrackEvents.buttonClicked,
        expect.objectContaining({
          button: "Home",
          live_app,
          live_app_version,
        }),
        expect.anything(),
      );
    });

    it("calls page with correct details", async () => {
      const { result } = renderHook(() => useAnalytics());

      await waitFor(() => {
        expect(mockAnalyticsLoad).toHaveBeenCalled();
      });

      result.current.page(TackedPages.dashboard, { homeData: "TEST_DATA" });
      await waitFor(() => {
        expect(mockTrackPage).toHaveBeenCalledWith(
          live_app,
          TackedPages.dashboard,
          expect.objectContaining({
            homeData: "TEST_DATA",
            live_app,
            live_app_version,
            type: PageType.page,
          }),
          expect.anything(),
        );
      });
    });
  });
});
