import { mockUseUserId, mockUseUserIdData } from "@/tools/mocks/userId.mock";
import { mockUseWalletInfo, mockUseWalletInfoData } from "@/tools/mocks/walletInfo.mock";

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
