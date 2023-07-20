import { useEffect, useState } from "react";
import { useGetOnSearchQuery, useGetSearchedStockQuery } from "../services/financialApi.js";
import { Input, Space } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { setSearchResults, setSearchTerm, setPerformanceId } from "../services/searchedStock.js"
import { useNavigate } from "react-router-dom";


const { Search } = Input;

function SearchBar({
  searchBarWidth,
}) {
  const dispatch = useDispatch();

  const searchTerm = useSelector((state) => state.searchedStock.searchTerm);
  const performanceId = useSelector((state) => state.searchedStock.performanceId);
  
  const [isSearching, setIsSearching] = useState(false);
  
  const { data: searchResult, isLoading: isSearchLoading } = useGetOnSearchQuery(searchTerm);
  
  const { data: searchedStock, isLoading: isSearchedStockLoading} = useGetSearchedStockQuery( performanceId );
  
  const navigate = useNavigate();


  const onSearch = (value) => {
    setIsSearching(true);
    dispatch(setSearchTerm(value));
  };

  useEffect(() => {
    dispatch(setPerformanceId(searchResult?.results?.[0]?.performanceId));
  }, [searchResult, dispatch]);
  
  useEffect(() => {
    if (searchedStock) {
      const updatedSearchedStock = {
        ...searchedStock,
        name: searchResult?.results?.[0]?.name,
      };
      dispatch(setSearchResults(updatedSearchedStock));
    }
  }, [searchedStock, dispatch, searchResult]);

  useEffect(() => {
    if (isSearching) {
      navigate(`/stocks/${performanceId}/details`);
    }
  }, [isSearching, navigate, performanceId]);

  if (isSearchLoading || isSearchedStockLoading) return <p>Loading...</p>;

  return (
    <Space direction="vertical" style={{ width: searchBarWidth }}>
      <Search
        placeholder="Search stock"
        enterButton="Search"
        onSearch={onSearch}
        className="custom-search-bar"
        
      />
    </Space>
  );
}

export default SearchBar;
