import { Outlet } from "react-router-dom";
import Nav from "./Layout/Main/Nav";
import Footer from "./Layout/Main/Footer";

function App() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
