import SearchBar from "../Search.jsx";
import Movers from "./Movers.jsx";
import VideoPlayer from "./VideoPlayer.jsx";

import { Col, Row, Typography } from "antd";

function Homepage({ searchBarWidth }) {
  const { Title } = Typography;
  
  return (
    <>
      <Row>
        <Col span={24} className="search-bar-container">
          <SearchBar searchBarWidth={searchBarWidth} />
        </Col>
      </Row>
      <Row>
        <Col span={5} xs={24} sm={5} md={5}>
          <Movers />
          </Col>
        <Col span={14} xs={24} sm={14} md={14} className="video-container">
          <VideoPlayer xs={24} sm={5} md={5} />
        </Col>
        <Col span={5}>col-8</Col>
      </Row>
      {/* <Row>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
    </Row> */}

      {/* <Title className="movers-title">Movers</Title>
        <Title className="movers-secondary-title">
          Discover the equities with the greatest gains in the trading day.
        </Title> */}
    </>
  );
}

export default Homepage;
