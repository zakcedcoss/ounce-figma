import { Topbar, Button, FlexLayout, NewSidebar } from "@cedcommerce/ounce-ui";
import { FiBox } from "react-icons/fi";
import { CgTemplate } from "react-icons/cg";
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
