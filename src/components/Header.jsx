import { useState, useEffect } from 'react';
import { Col, Layout, Row, Statistic } from 'antd';
import { startTime } from '../utils/clock';

const { Header: HeaderAntd } = Layout;

function Header({ colorContainer }) {
  
  const [time, setTime] = useState({
    Sofia: '',
    London: '',
    NewYork: '',
    Shanghai: '',
    Tokyo: '',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      startTime()
        .then((resultTime) => {
          setTime({
            Sofia: resultTime.Sofia,
            London: resultTime.London,
            NewYork: resultTime.NewYork,
            Shanghai: resultTime.Shanghai,
            Tokyo: resultTime.Tokyo,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <HeaderAntd style={{ padding: 0, background: colorContainer }}>
      <Row style={{ paddingLeft: '25px' }}>
        <Col span={4}>
          <Statistic title="New York" value={time.NewYork} />
        </Col>
        <Col span={4}>
          <Statistic title="London" value={time.London} />
        </Col>
        <Col span={4}>
          <Statistic title="Sofia" value={time.Sofia} />
        </Col>
        <Col span={4}>
          <Statistic title="Shanghai" value={time.Shanghai} />
        </Col>
        <Col span={4}>
          <Statistic title="Tokyo" value={time.Tokyo} />
        </Col>
      </Row>
    </HeaderAntd>
  );
}

export default Header;
