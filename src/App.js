import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { routes } from "./Constants/routes";
import { cloneElement, useState } from "react";

const FOOTER_HEIGHT = "75px";
function App() {
  const [pageTheme, setPageTheme] = useState(null);

  const COMPONENT_ROUTES = routes.map((component, idx) => {
    const componentWithColor = cloneElement(component.element, pageTheme);

    return (
      <Route key={idx} path={component.path} element={componentWithColor} />
    );
  });

  return (
    <>
      <HashRouter>
        <Navbar changeTheme={setPageTheme} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: FOOTER_HEIGHT,
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
