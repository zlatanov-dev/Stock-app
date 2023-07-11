import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = process.env.REACT_APP_STOCK_API_KEY;
const STOCK_API_HOST = process.env.REACT_APP_STOCK_API_HOST;

const stockApiHeaders = {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': STOCK_API_HOST
}

const baseUrl = `https://${STOCK_API_HOST}`;