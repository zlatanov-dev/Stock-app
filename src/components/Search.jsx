import { useEffect, useState } from "react";
import { useGetOnSearchQuery, useGetSearchedStockQuery } from "../services/financialApi.js";
import { Input, Space } from "antd";

import { useDispatch } from "react-redux";
import { setSearchResults } from "../services/searchedStock.js"
import { useNavigate } from "react-router-dom";


const { Search } = Input;

function SearchBar({
  searchBarWidth,
  
}) {
  const [searchTerm, setSearchTerm] = useState("MSFT");

  const { data: searchResult, isLoading: isSearchLoading, refetch } = useGetOnSearchQuery(searchTerm);

  const performanceId = searchResult?.results?.[0]?.performanceId;

  const { data: searchedStock, isLoading: isSearchedStockLoading} = useGetSearchedStockQuery( performanceId || '0P000003MH');

  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  const onSearch = async (value) => {
    setSearchTerm(value);
  };
  
  
  useEffect(() => {
    refetch();
  }, [searchTerm, refetch]);
  
  useEffect(() => {
    if (searchedStock) {
      const updatedSearchedStock = {
        ...searchedStock,
        name: searchResult?.results?.[0]?.name,
      };
      dispatch(setSearchResults(updatedSearchedStock));
      navigate(`/stocks/${performanceId}/details`);
    }
  }, [searchedStock, dispatch, searchResult, navigate, performanceId]);

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
