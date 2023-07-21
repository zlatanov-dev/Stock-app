import { useState } from "react";

import ChartComponent from "../ChartComponent";
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

  const { data, isLoading, isError } = useGetStocksQuery({
    stock,
    queryFunction,
    interval,
  });

  const { Title } = Typography;

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error occurred while fetching data.</p>;

  const title = searchResults?.ticker;

  return (
    <>
      <Row>
        <Col span={24} className="search-bar-container">
          <SearchBar searchBarWidth={searchBarWidth} />
        </Col>
      </Row>
      <Row>
        <Col span={24} >
          <div className="chart-container">
            <div className="chart-card-container">
              <div className="stock-title-container">
                <Title level={2} style={{ color: "#001529" }}>
                  {title}
                </Title>
              </div>
                <Row justify="end" align="middle" className="button-container">
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
              <div className="responsive-chart-container">
                <ChartComponent data={data} />
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24} >
          <Description searchResults={searchResults} />
        </Col>
      </Row>
    </>
  );
}

export default Details;
