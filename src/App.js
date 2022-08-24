import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { PAGETHEME } from "./Constants/colors";
import { routes } from "./Constants/routes";
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
      <BrowserRouter>
        <Navbar style={{ color: pageColor }} changeTheme={setPageColor} />
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
      </BrowserRouter>
    </>
  );
}

export default App;
