import {
  CalendarOutlined,
  ContactsOutlined,
  HomeOutlined,
  ProfileOutlined,
  StockOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar({ fontSize, fontSizePercent }) {

  const performanceId = useSelector((state) => state.searchedStock.performanceId);

  return (
   
    <Menu
      theme='dark'
      defaultSelectedKeys={["1"]}
      mode="inline"
      style={{
        fontSize: fontSize,
    }}
    >
      <Menu.Item
        key="1"
        icon={
          <HomeOutlined style={{ fontSize: fontSizePercent }} />
        }
      >
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={
          <StockOutlined style={{ fontSize: fontSizePercent }} />
        }
      >
        <Link to={`/stocks/${performanceId}/details`}>Discover</Link>
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={
          <ProfileOutlined style={{ fontSize: fontSizePercent }} />
        }
      >
        <Link to="/news">News</Link>
      </Menu.Item>
      <Menu.Item
        key="4"
        icon={
          <CalendarOutlined style={{ fontSize: fontSizePercent }} />
        }
      >
        Calendar
      </Menu.Item>

      {/* Conditionaly show Login Logout and Register */}

      <Menu.SubMenu
        key="sub1"
        icon={
          <UserOutlined style={{ fontSize: fontSizePercent}} />
        }
        title="User"
      >
        <Menu.Item key="5">Tom</Menu.Item>
        <Menu.Item key="6">Bill</Menu.Item>
        <Menu.Item key="7">Alex</Menu.Item>
      </Menu.SubMenu>
      {/* Conditionally show if user is Logged in MyPortfolio */}
      <Menu.SubMenu
        key="sub2"
        icon={
          <TeamOutlined style={{ fontSize: fontSizePercent }} />
        }
        title="Team"
      >
        <Menu.Item key="8">Team 1</Menu.Item>
        <Menu.Item key="9">Team 2</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item
        key="10"
        icon={
          <ContactsOutlined style={{ fontSize: fontSizePercent }} />
        }
      >
        Contacts
      </Menu.Item>
    </Menu>
  );
}

export default Navbar;
