import { configureStore } from "@reduxjs/toolkit";

import searchedStockReducer from "../services/searchedStock"; 
import loadingReducer from "../services/loading";

import { stockApi } from "../services/stockApi";
import { financialApi } from "../services/financialApi";
import { newsApi } from "../services/newsApi";


export default configureStore({
  reducer: {
    [stockApi.reducerPath]: stockApi.reducer,
    [financialApi.reducerPath]: financialApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    searchedStock: searchedStockReducer,
    loading: loadingReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(stockApi.middleware)
      .concat(financialApi.middleware)
      .concat(newsApi.middleware)
});
