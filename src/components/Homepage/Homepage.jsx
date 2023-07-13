import SearchBar from "./Search.jsx";
import { useGetStocksQuery } from "../../services/stockApi.js";
import ChartComponent from "./ChartComponent.jsx";
import { useEffect, useState } from "react";
import { Col, Row, Button, Typography } from "antd";



function Homepage({ searchBarWidth }) {
  const [searchTerm, setSearchTerm] = useState("MSFT");
  const [queryFunction, setQueryFunction] = useState("TIME_SERIES_DAILY");
  const { data, isLoading, isError, refetch } = useGetStocksQuery(searchTerm, queryFunction);
  
  useEffect(() => {
    refetch();
  }, [queryFunction]);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error occurred while fetching data.</p>;

  console.log(queryFunction)
  const title = data["Meta Data"]["2. Symbol"];
  
  return (
    <>
      <div className="search-bar-container">
        <SearchBar searchBarWidth={searchBarWidth} setSearchTerm={setSearchTerm} />
      </div>
      <div className="chart-container">

        <div className="chart-card-container">
          <div className="stock-title-container">
          <Typography.Title level={1} style={{ color: "#001529" }}>
              {title}
          </Typography.Title>
          </div>
            <div className="button-container">
            <Row justify="end" align="middle">
                <Col>
                  <Button type="primary" onClick={() => setQueryFunction("TIME_SERIES_DAILY")} className="time-frame-button">Day</Button>
                </Col>
                <Col>
                  <Button type="primary" onClick={() => setQueryFunction("TIME_SERIES_WEEKLY")} className="time-frame-button">Week</Button>
                </Col>
                <Col>
                  <Button type="primary" onClick={() => setQueryFunction("TIME_SERIES_MONTHLY")} className="time-frame-button">Month</Button>
                </Col>
              </Row>
              
            </div>
            <div className="responsive-chart-container">
            <ChartComponent data={data} />
            </div>
         </div>
        </div>
    </>
  // ON click on the button there should be a useState that changes the function that the querry awaits
  );
}

export default Homepage;
