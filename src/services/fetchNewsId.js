import axios from "axios";

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const NEWS_API_HOST = process.env.REACT_APP_NEWS_API_HOST;

export const fetchNewsData = async () => {
  const url = `https://${NEWS_API_HOST}/news/v2/list?snippetCount=28&region=US`;
  
  const headers = {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": NEWS_API_HOST,
  };

  try {
    const response = await axios.post(url, null, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
};

