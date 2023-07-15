import { configureStore } from "@reduxjs/toolkit";

import { stockApi } from "../services/stockApi";
import { moversApi } from "../services/financialsApi";

export default configureStore({
    reducer: {
      [stockApi.reducerPath]: stockApi.reducer,
      [moversApi.reducerPath]: moversApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(stockApi.middleware)
        .concat(moversApi.middleware)
  });
  