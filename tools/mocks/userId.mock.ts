import { useUserId } from "@ledgerhq/wallet-api-client-react";

const TEST_USER_ID = "TEST_USER_ID";
const mockUseUserId = useUserId as jest.MockedFunction<typeof useUserId>;

const mockUseUserIdData = {
  userId: TEST_USER_ID,
  updatedAt: new Date(),
  error: null,
  loading: false,
  updateData: jest.fn(),
};

export { TEST_USER_ID, mockUseUserIdData, mockUseUserId };
