import { Outlet } from "react-router-dom";
import Nav from "./Layout/Main/Nav";
import Footer from "./Layout/Main/Footer";

function App() {
  return (
    <div data-theme="white">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
