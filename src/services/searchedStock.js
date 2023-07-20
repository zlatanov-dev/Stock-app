import { createSlice } from "@reduxjs/toolkit";

const searchedStockSlice = createSlice({
  name: "searchedStock",
  initialState: {
    searchResults: [],
    searchTerm: "MSFT",
    performanceId: '0P000003MH',
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setPerformanceId: (state, action) => {
      state.performanceId = action.payload;
    }
  },
});

export const { 
  setSearchResults,
  setSearchTerm,
  setPerformanceId,
} = searchedStockSlice.actions;

export default searchedStockSlice.reducer;
