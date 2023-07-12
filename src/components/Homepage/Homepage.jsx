import SearchBar from "./Search.jsx";
import { useGetStocksQuery } from "../../services/stockApi.js";
import ChartComponent from "./ChartComponent.jsx";
import { useState } from "react";
import { Card, Col, Row, Button } from "antd";


function Homepage({ searchBarWidth }) {
  const [searchTerm, setSearchTerm] = useState("MSFT");
  const { data, isLoading } = useGetStocksQuery(searchTerm);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="search-bar-container">
        <SearchBar searchBarWidth={searchBarWidth} setSearchTerm={setSearchTerm} />
      </div>
      <div className="chart-container">
          <Card bordered={false}>
            <div className="button-container">
              <Row justify="end">
                <Col>
                  <Button type="primary" className="time-frame-button">5</Button>
                </Col>
                <Col>
                  <Button type="primary" className="time-frame-button">10</Button>
                </Col>
                <Col>
                  <Button type="primary" className="time-frame-button">15</Button>
                </Col>
                <Col>
                  <Button type="primary" className="time-frame-button">20</Button>
                </Col>
              </Row>
            </div>
            <ChartComponent data={data} />
          </Card>
      </div>
    </>
  );
}

export default Homepage;
