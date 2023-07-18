import { HomePage, Navbar, AnnouncementBar } from "./components";
import { deviceType, sizeByDevice } from "./utils/device";
import { Route, Routes } from "react-router-dom";

import { Layout} from "antd";
import { useEffect, useState } from "react";

import "./App.css";

const { Content, Footer, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const device = deviceType(screenSize);

  const size = sizeByDevice(device, collapsed);

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
          width={size.width}
        >
          <div className="demo-logo-vertical" />
          <Navbar {...size} />
        </Sider>
        <Layout>
        < AnnouncementBar />
          <Content
            style={{
              margin: "0 16px",
              overflow: "auto",
              minHeight: "calc(100vh - 64px)",
              color: "#fff",
            }}
          >
            <div
              className="site-layout-background"
            >
              <Routes>
                <Route path="/" element={<HomePage {...size} />} />
                <Route path="/stocks/:performanceId" element={<HomePage {...size} />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: "center", fontSize: "20px" }}>
            @2023 Created by Zlatanov-dev
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
