// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { ArrayBuffer, TextDecoder, TextEncoder, Uint8Array } from "util";
import { server } from "@/tools/mocks/server";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.ArrayBuffer = ArrayBuffer;
global.Uint8Array = Uint8Array;

// MSW integration

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
