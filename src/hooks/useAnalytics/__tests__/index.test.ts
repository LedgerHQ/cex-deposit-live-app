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

import { useUserId, useWalletInfo } from "@ledgerhq/wallet-api-client-react";
import { AnalyticsBrowser } from "@segment/analytics-next";

const TEST_USER_ID = "TEST_USER_ID";
const mockUseWalletInfoData = {
  walletInfo: {
    wallet: {
      name: "ledger-live",
      version: "",
    },
    tracking: true,
  },
  updatedAt: new Date(),
  error: null,
  loading: false,
  updateData: jest.fn(),
};

const mockUseUserIdData = {
  userId: TEST_USER_ID,
  updatedAt: new Date(),
  error: null,
  loading: false,
  updateData: jest.fn(),
};

jest.mock("@ledgerhq/wallet-api-client");
jest.mock("@ledgerhq/wallet-api-client-react");

jest.mock("@ledgerhq/wallet-api-client", () => {
  return {
    WindowMessageTransport: jest.fn(),
    WalletAPIClient: jest.fn(),
  };
});

const mockUseUserId = useUserId as jest.MockedFunction<typeof useUserId>;
const mockUseWalletInfo = useWalletInfo as jest.MockedFunction<typeof useWalletInfo>;

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
    mockUseWalletInfo.mockReturnValue(mockUseWalletInfoData);
    mockUseUserId.mockReturnValue(mockUseUserIdData);
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
