import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./pages/Shared/Footer/Footer";
import Navbar from "./pages/Shared/Navbar/Navbar";

function App() {
  return (
    <div>
      <div className="max-w-7xl w-11/12 mx-auto">
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
