import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { routes } from "./Constants/routes";
import { cloneElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "./Store/Reducers/user";
import UserAPI from "./Api/UserAPI";
import {
  setSnackbarSuccess,
  setSnackbarWarning,
  showSnackbar,
} from "./Store/Reducers/snackbar";
import SnackbarMessage from "./Components/Snackbar";

const FOOTER_HEIGHT = "75px";
const NAVBAR_HEIGHT_AND_GAP = `${80 + 20}px`;
function App() {
  const dispatch = useDispatch();
  const snackbarContent = useSelector((state) => state.snackbar);
  const [pageTheme, setPageTheme] = useState(null);
  const [restoringSession, setRestoringSession] = useState(true);

  async function restoreUserSession() {
    setRestoringSession(true);
    await UserAPI.restoreSession()
      .then((res) => {
        dispatch(userLogin(res.currentUser));
        dispatch(setSnackbarSuccess("Restored Session"));
      })
      .catch(() => dispatch(setSnackbarWarning("Couldn't restore session")))
      .finally(() => {
        setRestoringSession(false);
      });
  }

  // Attempt to restore session on load
  useEffect(() => {
    restoreUserSession();
    // eslint-disable-next-line
  }, []);

  function hideSnackbar(event, reason) {
    if (reason === "clickaway") return;

    dispatch(showSnackbar(false));
  }

  const COMPONENT_ROUTES = routes.map((component, idx) => {
    const componentWithColor = cloneElement(component.element, pageTheme);

    return (
      <Route key={idx} path={component.path} element={componentWithColor} />
    );
  });

  return (
    <>
      {!restoringSession && (
        <HashRouter>
          <Navbar changeTheme={setPageTheme} />
          {snackbarContent.show && (
            <SnackbarMessage
              snackbarContent={snackbarContent}
              showSnackbar={snackbarContent.show}
              hideSnackbar={hideSnackbar}
            />
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: NAVBAR_HEIGHT_AND_GAP,
              paddingBottom: FOOTER_HEIGHT,
            }}
          >
            <Routes>{COMPONENT_ROUTES}</Routes>
          </div>
          <Footer />
        </HashRouter>
      )}
    </>
  );
}

export default App;
