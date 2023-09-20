import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LoginPartial from "./LoginPartial";

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          style={{ flexGrow: 1 }}
          component={Link}
          to={`/`}
          sx={{ textDecoration: "none" }}
        >
          QuizOnRails
        </Typography>
        <LoginPartial />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
