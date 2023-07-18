import SearchBar from "./Search.jsx";
import ChartComponent from "./ChartComponent.jsx";
import Movers from "./Movers.jsx";
import { useGetStocksQuery } from "../../services/stockApi.js";

import { useEffect, useState } from "react";
import { Col, Row, Button, Typography } from "antd";
import millify from "millify";

function Homepage({ searchBarWidth }) {
  const [selectedButton, setSelectedButton] = useState("DAY");
  const [queryFunction, setQueryFunction] = useState("TIME_SERIES_DAILY");
  const [interval, setInterval] = useState("5min");
  const [searchedStock, setSearchedStock] = useState({});

  const stock = searchedStock?.ticker || "MSFT";

  const { data, isLoading, isError, refetch } = useGetStocksQuery({
    stock,
    queryFunction,
    interval,
  });

  useEffect(() => {
    refetch();
  }, [queryFunction, refetch]);

  const { Title } = Typography;

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error occurred while fetching data.</p>;

  const title = searchedStock?.ticker;

  return (
    <>
      <div className="search-bar-container">
        <SearchBar
          searchBarWidth={searchBarWidth}
          setSearchedStock={setSearchedStock}
        />
      </div>

      <div className="chart-container">
        <div className="chart-card-container">
          <div className="stock-title-container">
            <Title level={2} style={{ color: "#001529" }}>
              {title}
            </Title>
          </div>
          <div className="button-container">
            <Row justify="end" align="middle">
              <Col>
                <Button
                  type="primary"
                  onClick={() => {
                    setQueryFunction("TIME_SERIES_INTRADAY");
                    setSelectedButton("30min");
                    setInterval(() => "30min");
                  }}
                  className="time-frame-button"
                  style={{
                    backgroundColor:
                      selectedButton === "30min" ? "#1890FF" : "#5DB43D",
                  }}
                >
                  30 min
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    setQueryFunction("TIME_SERIES_INTRADAY");
                    setSelectedButton("60min");
                    setInterval(() => "60min");
                  }}
                  className="time-frame-button"
                  style={{
                    backgroundColor:
                      selectedButton === "60min" ? "#1890FF" : "#5DB43D",
                  }}
                >
                  1 h
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    setQueryFunction("TIME_SERIES_DAILY");
                    setSelectedButton("DAY");
                  }}
                  className="time-frame-button"
                  style={{
                    backgroundColor:
                      selectedButton === "DAY" ? "#1890FF" : "#5DB43D",
                  }}
                >
                  Day
                </Button>
              </Col>
              <Col>
                <Button
                  type="primary"
                  onClick={() => {
                    setQueryFunction("TIME_SERIES_WEEKLY");
                    setSelectedButton("WEEK");
                  }}
                  className="time-frame-button"
                  style={{
                    backgroundColor:
                      selectedButton === "WEEK" ? "#1890FF" : "#5DB43D",
                  }}
                >
                  Week
                </Button>
              </Col>
              <Col>
                <Button
                  type="primary"
                  onClick={() => {
                    setQueryFunction("TIME_SERIES_MONTHLY");
                    setSelectedButton("MONTH");
                  }}
                  className="time-frame-button"
                  style={{
                    backgroundColor:
                      selectedButton === "MONTH" ? "#1890FF" : "#5DB43D",
                  }}
                >
                  Month
                </Button>
              </Col>
            </Row>
          </div>
          <div className="responsive-chart-container">
            <ChartComponent data={data} />
          </div>
        </div>
      </div>
      {searchedStock && Object.keys(searchedStock).length > 0 && (
        <div className="chart-details-container" style={{ marginLeft: "20px" }}>
          <div className="chart-details-card" style={{ color: "black" }}>
            <Title> Details </Title>
            <p>Exchange: </p>
            <p>Price: {searchedStock?.lastPrice}</p>
            <p>Status: {searchedStock?.tradingStatus}</p>
            <p>
              Market Cap: {millify(searchedStock?.marketCap)}{" "}
              {searchedStock?.currencySymbol}
            </p>
          </div>
        </div>
      )}
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
