import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useNavigate, NavLink } from "react-router-dom";
import authService from "../../services/auth.service";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  welcome: {
    display: "flex",
    backgroundColor: "white",
    color: "black",
    borderRadius: "3px",
    padding: "0.2rem",
    maxWidth: "20rem",
    justifyContent: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  main: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

 export default function NavBar(props) {
  const classes = useStyles();
  const navigate = useNavigate();

  const { isLoggedIn, loggedOutHandler } = props;


  const signOutHandler = () => {
    authService.logout();
    loggedOutHandler();
  };

  return (
    <AppBar position="static" className={classes.title}>
      <Toolbar>
        <div className={classes.root}>
          <Typography
            variant="h6"
            className={`${classes.menuButton}`}
          >
            WelcomeToOurWebSite
          </Typography>

          {isLoggedIn && (
            <Typography
              href=""
              variant="h6"
              className={`${classes.menuButton} ${classes.link}`}
            >
              <NavLink to="/home" className={` ${classes.link}`}>
                Home
              </NavLink>
            </Typography>
          )}
          {isLoggedIn && (
            <Typography href="" variant="h6">
              <NavLink to="/profile" className={` ${classes.link}`}>
                Profile
              </NavLink>
            </Typography>
          )}
        </div>
        {!isLoggedIn && (
          <Button
            color="inherit"
            onClick={() => {
              navigate("/sign-in");
            }}
          >
            SignIn
          </Button>
        )}
        {isLoggedIn && (
          <Button color="inherit" onClick={signOutHandler}>
            SighOut
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

