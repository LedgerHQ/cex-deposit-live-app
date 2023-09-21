// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { ArrayBuffer, TextDecoder, TextEncoder, Uint8Array } from "util";

import { server } from "@/tools-test/mocks/server";
import { mockUseUserId, mockUseUserIdData } from "@/tools-test/mocks/userId.mock";
import { mockUseWalletInfo, mockUseWalletInfoData } from "@/tools-test/mocks/walletInfo.mock";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.ArrayBuffer = ArrayBuffer;
global.Uint8Array = Uint8Array;

jest.mock("@ledgerhq/wallet-api-client");
jest.mock("@ledgerhq/wallet-api-client-react");

jest.mock("@ledgerhq/wallet-api-client", () => {
  return {
    WindowMessageTransport: jest.fn(),
    WalletAPIClient: jest.fn(),
  };
});

beforeEach(() => {
  mockUseWalletInfo.mockReturnValue(mockUseWalletInfoData);
  mockUseUserId.mockReturnValue(mockUseUserIdData);
});

/**
 * @dev temporary fix due to https://github.com/QuiiBz/next-international/issues/178
 * This code completely override anything related to i18n in our test.
 */
jest.mock("@/i18n/client", () => ({
  I18nProvider: ({ children }) => <>{children}</>,
  useI18n: () => ({ t: jest.fn(), changeLocale: jest.fn(), locale: "en" }),
}));

// MSW integration

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
