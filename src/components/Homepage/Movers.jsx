import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";

import { useGetMoversQuery } from "../../services/moversApi.js";

function Movers() {
  const { data, isFetching } = useGetMoversQuery();

  if (isFetching) return <div>Loading...</div>;

  
  const { quotes: moversList } = data.finance.result[0];
  const iconUrl = data.finance.result[0].iconUrl;


  return (
    <>
      <Row gutter={[32, 32]} className="mover-card-container">
        {moversList?.map((mover, index) => (
          <Col xs={24} sm={12} lg={6} className="mover-card" key={index}>
            <Link to={`/mover/${mover.symbol}`}>
              <Card
                title={`${index + 1}. ${mover.symbol}`}
                extra={
                  <img className="mover-image" src={iconUrl} alt="mover" />
                }
                hoverable
              >
                <p>Exchange: {mover.exchange}</p>
                <p>Type: {mover.quoteType}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}
export default Movers;
