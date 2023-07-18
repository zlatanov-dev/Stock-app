import { useEffect, useState } from "react";
import { useGetOnSearchQuery, useGetSearchedStockQuery } from "../../services/financialsApi.js";
import { Input, Space } from "antd";

import { useDispatch } from "react-redux";
import { setSearchResults } from "../../services/searchedStock.js"


const { Search } = Input;

function SearchBar({
  searchBarWidth,
  
}) {
  const [searchTerm, setSearchTerm] = useState("MSFT");

  const { data: searchResult, isLoading: isSearchLoading, refetch } = useGetOnSearchQuery(searchTerm);

  const performanceId = searchResult?.results?.[0]?.performanceId;

  const { data: searchedStock, isLoading: isSearchedStockLoading} = useGetSearchedStockQuery( performanceId || '0P000003MH');

  const dispatch = useDispatch();

  const onSearch = (value) => {
    setSearchTerm(value);
  };
  
  
  useEffect(() => {
    refetch();
  }, [searchTerm, refetch]);
  
  useEffect(() => {
    if (searchedStock) {
      dispatch(setSearchResults(searchedStock));
    }
  }, [searchedStock, dispatch]);

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
