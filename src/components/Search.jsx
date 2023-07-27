import React, { useEffect, useState } from "react";
import {
  useGetOnSearchQuery,
  useGetSearchedStockQuery,
} from "../services/financialApi.js";
import { Input } from "antd";

import { useDispatch, useSelector } from "react-redux";
import {
  setSearchResults,
  setSearchTerm,
  setPerformanceId,
} from "../services/searchedStock.js";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

function SearchBar({ searchBarWidth }) {
  const dispatch = useDispatch();

  const searchTerm = useSelector((state) => state.searchedStock.searchTerm);

  const performanceId = useSelector(
    (state) => state.searchedStock.performanceId
  );

  const [isSearching, setIsSearching] = useState(false);

  const { data: searchResult, isLoading: isSearchLoading } =
    useGetOnSearchQuery(searchTerm);

  const { data: searchedStock, isLoading: isSearchedStockLoading } =
    useGetSearchedStockQuery(performanceId);

  const navigate = useNavigate();

  const onSearch = (value) => {
    setIsSearching(true);
    dispatch(setSearchTerm(value));
  };

  useEffect(() => {
    dispatch(setPerformanceId(searchResult?.results?.[0]?.performanceId || "0P000003MH"));
  }, [searchResult, dispatch]);

  useEffect(() => {
    if (searchedStock && searchResult) {
      const updatedSearchedStock = {
        ...searchedStock,
        name: searchResult.results?.[0]?.name || '',
      };
      dispatch(setSearchResults(updatedSearchedStock));
    }
  }, [searchedStock, searchResult, dispatch]);

  useEffect(() => {
    if (isSearching && performanceId) {
      navigate(`/stocks/${performanceId}/details`);
    }
  }, [isSearching, performanceId, navigate]);

  useEffect(() => {
    return () => {
      dispatch(setSearchTerm(''));
    };
  }, [dispatch]);
  
  if (isSearchLoading || isSearchedStockLoading) return <p>Loading...</p>;

  return (
    <Search
      placeholder="Search stock"
      enterButton="Search"
      onSearch={onSearch}
      className="custom-search-bar"
      style={{ width: searchBarWidth }}
    />
  );
}

export default React.memo(SearchBar);
