import { useWalletInfo } from "@ledgerhq/wallet-api-client-react";
const mockUseWalletInfo = useWalletInfo as jest.MockedFunction<typeof useWalletInfo>;

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

export { mockUseWalletInfoData, mockUseWalletInfo };
