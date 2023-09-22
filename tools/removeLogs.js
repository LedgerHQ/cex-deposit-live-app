/**
 * @dev We are removing error and warning logs from `@ledgerhq/react-ui`.
 */
const originalError = console.error;
const originalWarn = console.warn;

const EXCLUDED_ERRORS = [
  "If you accidentally passed it from a parent component, remove it from the DOM element.",
  "You provided a `checked` prop to a form field without an `onChange` handler.",
];

const EXCLUDED_WARNINGS = [
  " is being sent through to the DOM, which will likely trigger a React console error.",
];

console.error = (...args) => {
  const error = args.join();
  if (EXCLUDED_ERRORS.some((excluded) => error.includes(excluded))) {
    return;
  }
  originalError.call(console, ...args);
};

console.warn = (...args) => {
  const warning = args.join();
  if (EXCLUDED_WARNINGS.some((excluded) => warning.includes(excluded))) {
    return;
  }
  originalWarn.call(console, ...args);
};

module.exports = {};
