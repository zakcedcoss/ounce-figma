import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/panel/dashboard");
  });

  return <div className="home">Home Component</div>;
}

export default Home;
