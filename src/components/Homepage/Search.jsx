import { Input, Space } from "antd";
const { Search } = Input;


function SearchBar ({
  setSearchTerm,
  searchBarWidth
}) {

  const onSearch = (value) => setSearchTerm(value);

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
