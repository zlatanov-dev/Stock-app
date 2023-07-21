import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.REACT_APP_FINANCIAL_API_KEY;
const FINANCIAL_API_HOST = process.env.REACT_APP_FINANCIAL_API_HOST;

const financialApiHeaders = {
  "X-RapidAPI-Key": API_KEY,
  "X-RapidAPI-Host": FINANCIAL_API_HOST,
};

const baseUrl = `https://${FINANCIAL_API_HOST}`;

const createRequest = (url) => ({ url, headers: financialApiHeaders });

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
        createRequest(`/stock/v3/get-profile?performanceId=${performanceId}`),
    }),
    getVideosId: builder.query({
      query: () => createRequest(`/market/get-videos`),
    }),
    getVideos: builder.query({
      query: (id) => createRequest(`/articles/get-details?id=${id}`),
    }),
  }),
});

export const {
  useGetMoversQuery,
  useGetOnSearchQuery,
  useGetSearchedStockQuery,
  useGetStockDetailsQuery,
  useGetVideosIdQuery,
  useGetVideosQuery,
} = financialApi;
