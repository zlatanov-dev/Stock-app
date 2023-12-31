import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.REACT_APP_STOCK_API_KEY;
const STOCK_API_HOST = process.env.REACT_APP_STOCK_API_HOST;

const stockApiHeaders = {
  "X-RapidAPI-Key": API_KEY,
  "X-RapidAPI-Host": STOCK_API_HOST,
};

const baseUrl = `https://${STOCK_API_HOST}`;

const createRequest = (url) => ({ url, headers: stockApiHeaders });

export const stockApi = createApi({
  reducerPath: "stockApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getStocks: builder.query({
      query: ({ stock, queryFunction, interval }) => {
        if (queryFunction === "TIME_SERIES_INTRADAY") {
          return createRequest(
            `/query?function=${queryFunction}&symbol=${stock}&interval=${interval}&outputsize=compact`
          );
        }
        return createRequest(
          `/query?function=${queryFunction}&symbol=${stock}`
        );
      },
    }),
    topNews: builder.query({
      query: () =>
        createRequest(
          `/query?function=NEWS_SENTIMENT&topics=finance`
        ),
    }),
  }),
});

export const { useGetStocksQuery, useTopNewsQuery } = stockApi;
