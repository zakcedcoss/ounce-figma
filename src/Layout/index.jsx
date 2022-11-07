import { Topbar, Button, FlexLayout, NewSidebar } from "@cedcommerce/ounce-ui";
import { AiOutlineDown } from "react-icons/ai";
import { FiBell, FiBox } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { BsHouseDoor } from "react-icons/bs";
import { CgTemplate } from "react-icons/cg";
import { AiOutlineSetting } from "react-icons/ai";
import { FaRegHandshake } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();

  return (
    <div>
      <Topbar
        connectRight={
          <FlexLayout spacing="tight">
            <Button
              iconAlign="right"
              icon={<AiOutlineDown />}
              type="Outlined"
              content="Shopify"
            />

            <Button iconAlign="left" icon={<FiBell />} type="Outlined" />
            <Button iconAlign="left" icon={<BiUser />} type="Outlined" />
          </FlexLayout>
        }
      />
      <NewSidebar
        // logo={
        //   <img
        //     alt="CedCommerce"
        //     src="https://d3vlhkqyz4y38a.cloudfront.net/skin/frontend/cedcomnew/default/images/header/logo/ced-logo-web.svg"
        //     title="CedCommerce"
        //     width={150}
        //   />
        // }
        onChange={(e) => {
          console.log(e);
          navigate(e.path);
        }}
        menu={[
          {
            content: "Dashboard",
            icon: <BsHouseDoor />,
            id: "dashboard",
            path: "/dashboard",
          },
          {
            content: "Product Listing",
            icon: <FiBox />,
            id: "profiling",
            path: "/profiling",
          },
          {
            content: "Templates",
            icon: <CgTemplate />,
            id: "products",
            path: "/templates",
          },
          {
            content: "Settings",
            icon: <AiOutlineSetting />,
            id: "products",
            path: "/settings",
          },
          {
            content: "Help",
            icon: <FaRegHandshake />,
            id: "products",
            path: "/help",
          },
        ]}
      />
      {children}
    </div>
  );
}

export default Layout;
