import { Button, Col, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  function onClick() {
    navigate('/'); 
  }

  return (
    <div id='oopss'>
    <Row>
        <Col span={24} className='error-img'>
        <img src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt="404" />
        </Col>
      </Row>
      <Row>
        <Col span={24} >
        <p className="error-404">404</p>
        </Col>
      </Row>
      <Row>
        <Col span={24} >
        <p className="p-a">Page vanishing act! But fear not, our web wizards are on the hunt. Stay tuned for its encore appearance and enjoy the journey!</p>
        </Col>
      </Row>
      <Col span={24} className="p-b">
  <Button type="primary" className="p-b-button" onClick={() => onClick()}>
    Home Page
  </Button>
</Col>
    </div>
  );
}

export default ErrorPage;
