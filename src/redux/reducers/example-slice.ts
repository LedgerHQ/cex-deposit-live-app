import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: string;
};

export const initialExampleState: InitialState = {
  value: "example",
};

export const exampleSlice = createSlice({
  name: "example",
  initialState: initialExampleState,
  reducers: {
    changeValue: (_state: InitialState, action: PayloadAction<string>) => ({
      value: action.payload,
    }),
  },
});

// Action creators are generated for each case reducer function
export const { changeValue } = exampleSlice.actions;

export default exampleSlice.reducer;
