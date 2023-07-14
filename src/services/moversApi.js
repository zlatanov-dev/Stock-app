import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.REACT_APP_MOVERS_API_KEY;
const MOVERS_API_HOST = process.env.REACT_APP_MOVERS_API_HOST;

const moversApiHeaders = {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': MOVERS_API_HOST
}

const baseUrl = `https://${MOVERS_API_HOST}`;

const createRequest = (url) => ({ url, headers: moversApiHeaders });

export const moversApi = createApi({
  reducerPath: "moversApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getMovers: builder.query({
      query: () =>
        createRequest(
          `/market/v2/get-movers?region=US&lang=en-US&count=5&start=0`
        ),
    }),
  }),
});

export const { useGetMoversQuery } = moversApi;
