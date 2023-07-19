import { useEffect, useState } from "react";

import ChartComponent from '../ChartComponent'
import { useSelector } from "react-redux";
import SearchBar from "../Search";
import { useGetStocksQuery } from "../../services/stockApi.js";
import Description from "./Description";

import { Col, Row, Button, Typography } from "antd";

function Details({ searchBarWidth }) {
  const [selectedButton, setSelectedButton] = useState("DAY");
  const [queryFunction, setQueryFunction] = useState("TIME_SERIES_DAILY");
  const [interval, setInterval] = useState("5min");
  
  const searchedStockState = useSelector((state) => state.searchedStock);
  const { searchResults } = searchedStockState;

  const stock = searchResults?.ticker || "MSFT";

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

  const title = searchResults?.ticker;
  
  return (
    <>
      <div className="search-bar-container">
        <SearchBar
          searchBarWidth={searchBarWidth}
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
      <Description searchResults={searchResults}/>
    </>
  )
}

export default Details