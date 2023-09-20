# Redux Toolkit

For state management we have chosen to use redux with the [ReduxToolkit](https://redux-toolkit.js.org/) overlay.

ReduxToolkit uses [Redux](https://redux.js.org/) & [React Redux](https://react-redux.js.org/)

### Provider

React Redux includes a `<Provider />` component, which makes the Redux store available to the rest of your app:

### Hooks

React Redux provides a pair of custom React hooks that allow your React components to interact with the Redux store.

`useSelector` reads a value from the store state and subscribes to updates, while `useDispatch` returns the store's dispatch method to let you dispatch actions.

### Setup

Here is a quick initialization of the store

```ts
export const store = configureStore({
 reducer: {
  yourReducer,
 },
 devTools: true,
});
```

To use it and share the store with the whole application, all you have to do is create a provider that will wrap the other components.

```ts
export function ReduxProvider({children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
```

### Usage

To access a slice (small part of the store) you can use the `useAppSelector` hook.

To make a modification, we'll use `useAppDispatch`

```ts
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const state = useAppSelector((state) => state.exampleReducer.value);
const dispatch = useAppDispatch();
```
