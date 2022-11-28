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
  setSnackbarInfo,
  setSnackbarWarning,
  showSnackbar,
} from "./Store/Reducers/snackbar";
import SnackbarMessage from "./Components/Snackbar";

function App() {
  const dispatch = useDispatch();
  const snackbarContent = useSelector((state) => state.snackbar);
  const currentUser = useSelector((state) => state.user);
  const [pageTheme, setPageTheme] = useState(null);
  const [restoringSession, setRestoringSession] = useState(true);

  async function restoreUserSession() {
    if (!currentUser.auth_token) return;

    dispatch(setSnackbarInfo("Restoring Session..."));

    await UserAPI.restoreSession()
      .then((res) => {
        dispatch(userLogin(res.currentUser));
        dispatch(setSnackbarSuccess("Restored Session"));
      })
      .catch(() => dispatch(setSnackbarWarning("Couldn't restore session")));
  }

  // Attempt to restore session on load
  useEffect(() => {
    setRestoringSession(true);
    restoreUserSession().then(() => {
      setRestoringSession(false);
    });
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
      {snackbarContent.show && (
        <SnackbarMessage
          snackbarContent={snackbarContent}
          showSnackbar={snackbarContent.show}
          hideSnackbar={hideSnackbar}
        />
      )}
      {!restoringSession && (
        <HashRouter>
          <Navbar changeTheme={setPageTheme} />
          <div className="page-container">
            <Routes>{COMPONENT_ROUTES}</Routes>
          </div>
          <Footer />
        </HashRouter>
      )}
    </>
  );
}

export default App;
