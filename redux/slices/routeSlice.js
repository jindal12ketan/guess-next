import { createSlice } from "@reduxjs/toolkit";

const routeSlice = createSlice({
  name: "RouteSlice",
  initialState: {
    storedRoute: [],
  },
  reducers: {
    routeStore: (state, action) => {
      state.storedRoute = action.payload.storedRoute;
    },
  },
});

export const { routeStore } = routeSlice.actions;
export default routeSlice.reducer;
