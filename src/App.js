import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { PAGETHEME } from "./Constants/colors";
import { routes, routeColors } from "./Constants/routes";
import { useState } from "react";

function App() {
  const [pageColor, setPageColor] = useState(PAGETHEME.Blue);

  const COMPONENT_ROUTES = routes.map((component, idx) => {
    return (
      <Route key={idx} path={component.path} element={component.element} />
    );
  });

  return (
    <>
      <HashRouter>
        <Navbar changeTheme={setPageColor} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "100px",
          }}
        >
          <Routes>{COMPONENT_ROUTES}</Routes>
        </div>
        <Footer />
      </HashRouter>
    </>
  );
}

export default App;
