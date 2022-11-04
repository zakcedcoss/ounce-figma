import { Topbar, Button, FlexLayout, NewSidebar } from "@cedcommerce/ounce-ui";
import { AiOutlineDown } from "react-icons/ai";
import { FiBell, FiBox } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { BsHouseDoor } from "react-icons/bs";
import { CgTemplate } from "react-icons/cg";
import { AiOutlineSetting } from "react-icons/ai";
import { FaRegHandshake } from "react-icons/fa";
import Dashboard from "../components/Dashboard";

function Home() {
  return (
    <div className="home">
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

        menu={[
          {
            content: "Dashboard",
            icon: <BsHouseDoor />,
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
            path: "/panel/products",
          },
          {
            content: "Settings",
            icon: <AiOutlineSetting />,
            id: "products",
            path: "/panel/products",
          },
          {
            content: "Help",
            icon: <FaRegHandshake />,
            id: "products",
            path: "/panel/products",
          },
        ]}
      />
      <Dashboard />
    </div>
  );
}

export default Home;
