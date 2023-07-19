import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.REACT_APP_MOVERS_API_KEY;
const MOVERS_API_HOST = process.env.REACT_APP_MOVERS_API_HOST;

const moversApiHeaders = {
  "X-RapidAPI-Key": API_KEY,
  "X-RapidAPI-Host": MOVERS_API_HOST,
};

const baseUrl = `https://${MOVERS_API_HOST}`;

const createRequest = (url) => ({ url, headers: moversApiHeaders });

export const financialApi = createApi({
  reducerPath: "financialApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getMovers: builder.query({
      query: () => createRequest(`/market/v2/get-movers`),
    }),
    getOnSearch: builder.query({
      query: (searchParam) =>
        createRequest(`/market/v2/auto-complete?q=${searchParam}`),
    }),
    getSearchedStock: builder.query({
      query: (performanceId) =>
        createRequest(
          `/stock/v2/get-realtime-data?performanceId=${performanceId}`
        ),
    }),
    getStockDetails: builder.query({
      query: (performanceId) =>
        createRequest(
          `/stock/v3/get-profile?performanceId=${performanceId}`
        ),
    }),
  }),
});

export const {
  useGetMoversQuery,
  useGetOnSearchQuery,
  useGetSearchedStockQuery,
  useGetStockDetailsQuery,
} = financialApi;
