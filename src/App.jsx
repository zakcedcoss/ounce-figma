import "./App.css";
import { Routes, Route } from "react-router-dom";
import Profiling from "./components/Profiling/Profiling";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import Layout from "./Layout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/panel" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profiling" element={<Profiling />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
