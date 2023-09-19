import exampleSlice, { changeValue, initialExampleState } from "@/redux/reducers/example-slice";

describe("tests for exampleSlice", () => {
  it("should initialize slice with initialValue", () => {
    const exampleSliceInit = exampleSlice(initialExampleState, {
      type: undefined,
    });
    expect(exampleSliceInit).toEqual(initialExampleState);
  });

  it("should update value", () => {
    const newValue = "NEW VALUE";

    const afterReducerOperation = exampleSlice(initialExampleState, changeValue(newValue));

    expect(afterReducerOperation).toEqual({
      value: newValue,
    });
  });
});
