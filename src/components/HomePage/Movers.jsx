import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import icon from "../../images/arrow.png";

import { useGetMoversQuery } from "../../services/financialApi.js";

function Movers() {
  const { data, isFetching } = useGetMoversQuery();

  if (isFetching) return <div>Loading...</div>;

  const { gainers: moversList } = data;

  return (
    <>
      <Row gutter={[32, 32]} className="mover-card-container">
        {moversList?.map((mover, index) => (
          <Col xs={24} sm={12} lg={6} className="mover-card" key={index}>
            <Link to={`/stocks/${mover.performanceId}`}>
              <Card
                title={`${index + 1}. ${mover.name}`}
                extra={<img className="mover-image" src={icon} alt="mover" />}
                hoverable
                style={{ fontSize: "1.2rem", fontWeight: "bold" }}
              >
                <p>
                  Percent Change:{" "}
                  <span style={{ color: "green" }}>
                    {mover.percentNetChange.toFixed(2)}%
                  </span>
                </p>
                <p>Exchange: {mover.exchange}</p>
                <p>Volume: {mover.volume}</p>
                <p>Ticker: {mover.ticker}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Movers;
