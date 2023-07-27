import { useSelector } from "react-redux";
import SearchBar from "../Search.jsx";
import Movers from "./Movers.jsx";
import TopNews from "./TopNews.jsx";
import VideoPlayer from "./VideoPlayer.jsx";
import Loader from "../Loader.jsx";

import { Col, Row } from "antd";
import { useEffect } from "react";

function Homepage({ searchBarWidth }) {
  const { loading: isLoading } = useSelector((state) => state.loading);
  
  useEffect(() => {
    console.log("🚀 ~ file: HomePage.jsx:12 ~ Homepage ~ isLoading:", isLoading)
  }, [isLoading]);
  
  if (isLoading) {
    return < Loader />;
  }

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
            <Col span={5} xs={24} sm={5} md={5} className="top-news">
              <TopNews />
            </Col>
          </Row>
        </>
  );
}

export default Homepage;
