import { createSlice } from "@reduxjs/toolkit";

const searchedStockSlice = createSlice({
  name: "searchedStock",
  initialState: {
    searchResults: [],
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { setSearchResults } = searchedStockSlice.actions;

export default searchedStockSlice.reducer;
