/**
 * @jest-environment jsdom
 */

import { render, screen } from "@/TestTools";
import Error from "@/app/error";
import { error } from "@/tools/mocks/error.mock";

describe("Error Component", () => {
  const mockReset = jest.fn();

  it("renders a heading", () => {
    render(<Error error={error} reset={mockReset} />);

    const heading = screen.getByRole("heading", {
      name: /Something went wrong!/i,
    });

    expect(heading).toBeInTheDocument();
    const err = screen.getByRole("heading", {
      name: error.message,
    });

    expect(err).toBeInTheDocument();
  });
  it("should retry", async () => {
    const { user } = render(<Error error={error} reset={mockReset} />);

    const button = screen.getByRole("button", {
      name: /Try again/i,
    });
    await user.click(button);

    expect(mockReset).toHaveBeenCalled();
  });
});
