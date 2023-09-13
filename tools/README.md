# Testing Tools

## Style Provider & userEvent

using the `render` function exported from `test.tools.tsx` , you'll have the application theme and userEvents already configured

### How to use it ?

```ts
import { render, screen, renderHook } from "@/tools/test.tools"

describe("Your test suits", () => {
 it("What you want to test", async () => {
  renderHook(() => useYourHook()) // if you want to render a hook
  render(<Component />) // render component with custom render function
  const text = screen.getByRole("generic")
  expect(text).toBeInTheDocument()
 })
})
```

### With userEvent

```ts
import { render, screen } from "@/tools/test.tools"

const onClickMock = jest.fn()

describe("Your test suits", () => {
 it("What you want to test", async () => {
  const { user } = render(<Component />) // render component with custom render function and use userEvent
  const button = screen.getByRole("button")
  expect(button).toBeInTheDocument()

  await user.click(button)
  expect(onClickMock).toHaveBeenCalled()
 })
})
```

## MSW

[Mock Service Worker](https://mswjs.io/docs/) is an API mocking library that uses Service Worker API to intercept actual requests.

`handlers.js` contains REST API requests you want to mock
`server.js` configures a request mocking server with the given request handlers.
