import { Homepage, Navbar } from "./components";

import { Link, Route, Routes } from "react-router-dom";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useState } from "react";

import "./App.css";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Option 1", "1", <PieChartOutlined style={{ fontSize:"25px"}}/>),
  getItem("Option 2", "2", <DesktopOutlined style={{ fontSize:"25px"}}/>),
  getItem("User", "sub1", <UserOutlined style={{ fontSize:"25px"}}/>, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined style={{ fontSize:"25px"}}/>, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined style={{ fontSize:"25px"}}/>),
];

function App() {
  
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <div
      className="app"
      style={{ height: "100vh", backgroundColor: "#F8F8FF" }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Navbar collapsed={collapsed} />
          
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            HELLO!
          </Header>
          <Content style={{ margin: "0 16px"  }}>
            <div
              style={{
                paddingBottom: 50,
                height: "90vh",
                background: colorBgContainer,
              }}
            >
              <Routes>
                <Route path="/" element={<Homepage />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: "center", fontSize: "20px"}}>@2023 Created by Zlatanov-dev</Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
