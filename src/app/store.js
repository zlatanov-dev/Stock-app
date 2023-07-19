import { configureStore } from "@reduxjs/toolkit";

import searchedStockReducer from "../services/searchedStock"; 
import { stockApi } from "../services/stockApi";
import { financialApi } from "../services/financialApi";

export default configureStore({
  reducer: {
    [stockApi.reducerPath]: stockApi.reducer,
    [financialApi.reducerPath]: financialApi.reducer,
    searchedStock: searchedStockReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(stockApi.middleware)
      .concat(financialApi.middleware),
});
