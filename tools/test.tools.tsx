import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StyleProvider } from "@/styles/provider";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { appReducer } from "@/redux/store";

type PropsTheme = {
  children: React.ReactNode;
  theme?: "dark" | "light";
};

const mockedStore = configureStore({
  reducer: appReducer,
});
/**
 *
 * @param children Your component you want to render
 * @param theme Theme of your app, by default it's dark
 * @returns Your component wrapped with LedgerLive's StyleProvider
 */
const AllProviders = ({ children, theme = "dark" }: PropsTheme) => {
  return (
    <Provider store={mockedStore}>
      <StyleProvider selectedPalette={theme} fontsPath="/fonts">
        {children}
      </StyleProvider>
    </Provider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllProviders, ...options });

/**
 *
 * @param ui your ReactElement you want to render during test
 * @param options
 * @returns your component wrapped with theme and userEvent setuped
 */
const setupUserEventWithRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) => ({
  user: userEvent.setup(),
  ...customRender(ui, options),
});

export * from "@testing-library/react";
export { setupUserEventWithRender as render };
