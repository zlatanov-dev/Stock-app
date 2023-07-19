import SearchBar from "../Search.jsx";
import Movers from "./Movers.jsx";

import { Typography } from "antd";



function Homepage({ searchBarWidth }) {

  const { Title } = Typography;

  return (
    <>
      <div className="search-bar-container">
        <SearchBar
          searchBarWidth={searchBarWidth}
        />
      </div>

      <div className="movers-container">
        <Title className="movers-title">Movers</Title>
        <Title className="movers-secondary-title">
          Discover the equities with the greatest gains in the trading day.
        </Title>
      </div>
      <Movers />
    </>
  );
}

export default Homepage;
