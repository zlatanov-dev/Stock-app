import SearchBar from "./Search.jsx";
import ChartComponent from "./ChartComponent.jsx";
import Movers from "./Movers.jsx";
import { useGetStocksQuery } from "../../services/stockApi.js";
import { useEffect, useState } from "react";
import { Col, Row, Button, Typography } from "antd";
import { Link } from "react-router-dom";

function Homepage({ searchBarWidth }) {
  const [selectedButton, setSelectedButton] = useState("DAY");
  const [searchTerm, setSearchTerm] = useState("MSFT");
  const [queryFunction, setQueryFunction] = useState("TIME_SERIES_DAILY");
  const { data, isLoading, isError, refetch } = useGetStocksQuery({
    stock: searchTerm,
    queryFunction,
  });

  useEffect(() => {
    refetch();
  }, [queryFunction, refetch]);

  const { Title } = Typography;

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error occurred while fetching data.</p>;

  const { "2. Symbol": title } = data["Meta Data"];

  return (
    <>
      <div className="search-bar-container">
        <SearchBar
          searchBarWidth={searchBarWidth}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <div className="chart-container">
        <div className="chart-card-container">
          <div className="stock-title-container">
            <Title level={1} style={{ color: "#001529" }}>
              {title}
            </Title>
          </div>
          <div className="button-container">
            <Row justify="end" align="middle">
              <Col>
                <Button
                  type="primary"
                  onClick={() => {
                    setQueryFunction("TIME_SERIES_DAILY");
                    setSelectedButton("DAY");
                  }}
                  className="time-frame-button"
                  style={{
                    backgroundColor: selectedButton === "DAY" ? "#1890FF" : "#5DB43D",
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
                    backgroundColor: selectedButton === "WEEK" ? "#1890FF" : "#5DB43D",
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
                    backgroundColor: selectedButton === "MONTH" ? "#1890FF" : "#5DB43D",
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
      <div className="movers-container">
        <Title level={2} className="home-title">Movers</Title>
        <Title level={5} className="home-title">Discover the equities with the greatest gains in the trading day.</Title>
      </div>
      < Movers />
    </>
  );
}

export default Homepage;
