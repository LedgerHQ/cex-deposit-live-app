# Hooks

When you add a hook to this folder, make sure it is of the form :

```
useYourHook
|-- __tests__
|   |-- index.test.ts
`-- useYourhook.ts
```

The hook must be tested

## useAnalytics

## useError

```ts
const { throwError } = useError();
throwError(new Error("MESSAGE"));
```
