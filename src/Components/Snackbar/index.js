import { Alert, Snackbar } from "@mui/material";
/**
 * Returns a snackbar component to confirm user actions
 * @param {string} message - the snackbar message
 * @param {string} severity - error | warninng | info | success
 * @param {bool} showSnackbar - snackbar is visible
 * @param {void} hideSnackbar - handles hiding / closing the snackbar
 * @returns {ReactElement} a react component
 */
function SnackbarMessage({ snackbarContent, showSnackbar, hideSnackbar }) {
  const { message, severity } = snackbarContent;
  return (
    <Snackbar
      open={showSnackbar}
      autoHideDuration={1750}
      onClose={hideSnackbar}
    >
      <Alert onClose={hideSnackbar} severity={severity} sx={{ width: "100%" }}>
        <div
          style={{ fontSize: "1rem", display: "flex", alignItems: "center" }}
        >
          {message}
        </div>
      </Alert>
    </Snackbar>
  );
}

export default SnackbarMessage;
