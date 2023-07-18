import { Col, Row, Button, Typography } from "antd";

import ChartComponent from '../ChartComponent'
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../HomePage/Search";


const { Title } = Typography;

function Details() {
  
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
    </>
  )
}

export default Details