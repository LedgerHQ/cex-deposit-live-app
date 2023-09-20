// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { ArrayBuffer, TextDecoder, TextEncoder, Uint8Array } from "util";
import { server } from "@/tools/mocks/server";

import { mockUseUserId, mockUseUserIdData } from "@/tools/mocks/userId.mock";
import { mockUseWalletInfo, mockUseWalletInfoData } from "@/tools/mocks/walletInfo.mock";

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
jest.mock("next/router", () => require("next-router-mock"));

jest.mock("next-international", () => ({}));
jest.mock("next-international/server", () => ({
  createI18nServer: () => ({
    getI18n: () => Promise.resolve(() => ({ t: () => jest.fn(), locale: "en" })),
    getCurrentLocale: () => "en" | "fr",
  }),
}));

// MSW integration

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
