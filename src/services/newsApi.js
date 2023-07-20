import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const NEWS_API_HOST = process.env.REACT_APP_NEWS_API_HOST;

const newsApiHeaders = {
  "X-RapidAPI-Key": API_KEY,
  "X-RapidAPI-Host": NEWS_API_HOST,
};

const baseUrl = `https://${NEWS_API_HOST}`;

const createRequest = (url) => ({ url, headers: newsApiHeaders });

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getNews: builder.query({
        query: (id) => 
        createRequest(`/news/v2/get-details?region=US&uuid=${id}`),
      }),
  }),
});

export const { 
    useGetNewsQuery 
} = newsApi;
