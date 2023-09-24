import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { ConfirmProvider } from "material-ui-confirm";
import Layout from "./Layout/Layout";
import Register from "./Pages/Auth/Register/Register";
import Login from "./Pages/Auth/Login/Login";
import Home from "./Pages/Home/Home";
import ManageQuiz from "./Pages/ManageQuiz/ManageQuiz";
import ErrorElement from "./Pages/ErrorElement/ErrorElement";
import MyQuizzes from "./Pages/MyQuizzes/MyQuizzes";
import Play from "./Pages/Play/Play";
import QuizResult from "./Pages/QuizResult/QuizResult";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout children={<Home />} />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/quiz/attempt/:quizAttemptId/result",
    element: <Layout children={<QuizResult />} />,
  },
  {
    path: "quiz/:id",
    element: <Layout children={<Play />} />,
  },
  {
    path: "/quiz/:id/manage",
    element: <Layout children={<ManageQuiz />} />,
  },
  {
    path: "/quizzes/my",
    element: <Layout children={<MyQuizzes />} />,
  },
  {
    path: "/error",
    element: (
      <Layout children={<ErrorElement message="Something went wrong!" />} />
    ),
  },
  {
    path: "*",
    element: <Layout children={<ErrorElement message="404 not found" />} />,
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
