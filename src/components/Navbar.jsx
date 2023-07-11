import { DesktopOutlined, FileOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons"
import { HomeMaxOutlined } from "@mui/icons-material";
import { Menu } from "antd"
import { Link } from "react-router-dom"

function Navbar({ collapsed }) {

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={["1"]}
      mode="inline"
      style={{ fontSize: "20px", marginBellow: "20px" }}
    >
      <Menu.Item key="1" icon={<HomeMaxOutlined style={{ fontSize: collapsed ? "130%" : "100%", marginBottom: collapsed ? "20px" : "0" }} />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<DesktopOutlined style={{ fontSize: collapsed ? "130%" : "100%", marginBottom: collapsed ? "20px" : "0"  }} />}>
        Option 2
      </Menu.Item>
      <Menu.SubMenu key="sub1" icon={<UserOutlined style={{ fontSize: collapsed ? "130%" : "100%", marginBottom: collapsed ? "20px" : "0"  }} />} title="User">
        <Menu.Item key="3">Tom</Menu.Item>
        <Menu.Item key="4">Bill</Menu.Item>
        <Menu.Item key="5">Alex</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="sub2" icon={<TeamOutlined style={{ fontSize: collapsed ? "130%" : "100%", marginBottom: collapsed ? "20px" : "0"  }} />} title="Team">
        <Menu.Item key="6">Team 1</Menu.Item>
        <Menu.Item key="8">Team 2</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="9" icon={<FileOutlined style={{ fontSize: collapsed ? "130%" : "100%", marginBottom: collapsed ? "20px" : "0"  }} />}>
        Files
      </Menu.Item>
    </Menu>
  );
}

export default Navbar;
