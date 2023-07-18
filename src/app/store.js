// store.js
import { configureStore } from "@reduxjs/toolkit";
import searchedStockReducer from "../services/searchedStock"; // Import the searchedStockReducer
import { stockApi } from "../services/stockApi";
import { moversApi } from "../services/financialsApi";

export default configureStore({
  reducer: {
    [stockApi.reducerPath]: stockApi.reducer,
    [moversApi.reducerPath]: moversApi.reducer,
    searchedStock: searchedStockReducer, // Add the searchedStockReducer to the reducer object
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(stockApi.middleware)
      .concat(moversApi.middleware),
});
