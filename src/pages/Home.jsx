import { Outlet } from "react-router-dom";
import Layout from "../Layout";

function Home() {
  return (
    <div className="home">
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
}

export default Home;
