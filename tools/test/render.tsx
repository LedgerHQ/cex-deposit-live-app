import { I18nProvider } from "@/i18n/client";
import { RootState, setupStore } from "@/redux/store";
import { StyleProvider } from "@/styles/provider";
import { PreloadedState } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { RenderOptions, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: ToolkitStore;
}

/**
 *
 * @param ui your ReactElement you want to render during test
 * @param options
 * @returns your component wrapped with theme and userEvent setuped
 */

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({
    children,
    theme,
  }: PropsWithChildren<{
    theme?: "dark" | "light";
  }>): JSX.Element {
    return (
      <Provider store={store}>
        <StyleProvider selectedPalette={theme} fontsPath="/fonts">
          <I18nProvider>{children}</I18nProvider>
        </StyleProvider>
      </Provider>
    );
  }
  return {
    user: userEvent.setup(),
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export * from "@testing-library/react";
export { renderWithProviders as render };
