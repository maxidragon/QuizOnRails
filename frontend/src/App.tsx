import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { ConfirmProvider } from "material-ui-confirm";
import Register from "./Pages/Auth/Register/Register";
import Login from "./Pages/Auth/Login/Login";

const router = createHashRouter([
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
]);

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <SnackbarProvider>
        <ConfirmProvider>
          <RouterProvider router={router} />
        </ConfirmProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
