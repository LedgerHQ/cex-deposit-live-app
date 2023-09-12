/**
 * @jest-environment jsdom
 */

import Home from "@/src/app/page"
import { render, screen } from "@/tools/test.tools"

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />)

    const heading = screen.getByRole("heading", {
      name: /Docs/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
