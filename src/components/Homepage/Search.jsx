import { useEffect, useState } from "react";
import { useGetOnSearchQuery, useGetSearchedStockQuery } from "../../services/financialsApi.js";
import { Input, Space } from "antd";
const { Search } = Input;

function SearchBar({
  searchBarWidth,
  setSearchedStock
}) {
  const [searchTerm, setSearchTerm] = useState("MSFT");
  const { data: searchResult, isLoading: isSearchLoading, refetch } = useGetOnSearchQuery(searchTerm);
  const { data: searchedStock, isLoading: isSearchedStockLoading, refetch: refetchStock } = useGetSearchedStockQuery(searchResult?.results?.[0]?.performanceId || '0P000003MH');

  const onSearch = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    refetch();
    refetchStock();
  }, [searchTerm, refetch, refetchStock]);

  useEffect(() => {
    setSearchedStock(searchedStock);
  }, [searchedStock, setSearchedStock]);

  if (isSearchLoading || isSearchedStockLoading) return <p>Loading...</p>;

  return (
    <Space direction="vertical" style={{ width: searchBarWidth }}>
      <Search
        placeholder="input search text"
        enterButton="Search"
        onSearch={onSearch}
        className="custom-search-bar"
      />
    </Space>
  );
}

export default SearchBar;
