import { Topbar, Button, FlexLayout, NewSidebar } from "@cedcommerce/ounce-ui";
import { AiOutlineDown, AiOutlineSetting } from "react-icons/ai";
import { FiBell, FiBox } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { BsHouseDoor } from "react-icons/bs";
import { CgTemplate } from "react-icons/cg";
import { FaRegHandshake } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import {
  BellOutlined,
  DownOutlined,
  HomeTwoTone,
  QuestionCircleTwoTone,
  SettingTwoTone,
  UserOutlined,
} from "@ant-design/icons";

function Layout() {
  const navigate = useNavigate();

  return (
    <div>
      <Topbar
        connectRight={
          <FlexLayout spacing="tight">
            <Button
              iconAlign="right"
              icon={<DownOutlined />}
              type="Outlined"
              content="Shopify"
            />

            <Button iconAlign="left" icon={<BellOutlined />} type="Outlined" />
            <Button iconAlign="left" icon={<UserOutlined />} type="Outlined" />
          </FlexLayout>
        }
      />
      <NewSidebar
        logo={
          <img
            alt="CedCommerce"
            src="https://d3vlhkqyz4y38a.cloudfront.net/skin/frontend/cedcomnew/default/images/header/logo/ced-logo-web.svg"
            title="CedCommerce"
            width={150}
          />
        }
        onChange={(e) => {
          navigate(e.path);
        }}
        menu={[
          {
            content: "Dashboard",
            icon: <HomeTwoTone />,
            id: "dashboard",
            path: "/panel/dashboard",
          },
          {
            content: "Product Listing",
            icon: <FiBox />,
            id: "profiling",
            path: "/panel/profiling",
          },
          {
            content: "Templates",
            icon: <CgTemplate />,
            id: "products",
            path: "/panel/templates",
          },
          {
            content: "Settings",
            icon: <SettingTwoTone />,
            id: "products",
            path: "/panel/settings",
          },
          {
            content: "Help",
            icon: <QuestionCircleTwoTone />,
            id: "products",
            path: "/panel/help",
          },
        ]}
      />
      <Outlet />
    </div>
  );
}

export default Layout;
