import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { isUserLoggedIn, logout } from "../logic/auth";
import SettingsIcon from "@mui/icons-material/Settings";

const LoginPartial = () => {
  const navigate = useNavigate();
  const user = isUserLoggedIn();
  return (
    <>
      {user ? (
        <>
          <IconButton
            color="inherit"
            onClick={(event) => {
              event.preventDefault();
              logout();
              navigate("/");
              window.location.reload();
            }}
          >
            <LogoutIcon fontSize="medium" />
          </IconButton>
          <IconButton
            component={Link}
            to={`/settings`}
            rel="noopener noreferrer"
          >
            <SettingsIcon sx={{ color: "#fff" }} fontSize="medium" />
          </IconButton>
        </>
      ) : (
        <IconButton color="inherit" component={Link} to={"/auth/login"}>
          <LoginIcon fontSize="medium" />
        </IconButton>
      )}
    </>
  );
};

export default LoginPartial;
