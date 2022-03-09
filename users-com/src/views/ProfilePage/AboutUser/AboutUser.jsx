import React from "react";
import { Typography, Grid, Avatar, Paper, Button } from "@material-ui/core";
import authService from "../../../services/auth.service";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@mui/material/CssBaseline";

const useStyle = makeStyles({
  userImg: {
    width: "50%",
    height: "100%",
    marginTop: "5%",
  },
  typography: {
    overflow: "hidden",
    "text-overflow": "ellipsis",
    "word-wrap": "break-word",
    "overflow-wrap": "break-word",
  },
  paper: {
    marginTop: "5%",
    padding: "1%",
    width: "50%",
    display: "flex",
    justifyContent: "center",
  },
});

function AboutUser(props) {
  const { showUpdateUserFormHandler, userPostsHandler, showCloseModalHandler } =
    props;
  const userImg =
    "https://tzjoy.121talk.cn/Public/Home/newpage/assets/pages/img/people/img3-large.jpg";
  const currenUser = authService.getCurrentUser().user;
  const classes = useStyle();
  return (
    <>
      <CssBaseline />
      <Grid
        container
        xs={12}
        direction="column"
        alignItems="center"
        wrap="nowrap"
      >
        <Avatar alt="" src={userImg} className={classes.userImg} />
        <Paper variant="outlined" elevation={4} className={classes.paper}>
          <Typography variant="h6" className={classes.typography}>
            {`Name: ${currenUser.name}`}
          </Typography>
        </Paper>
        <Paper variant="outlined" elevation={6} className={classes.paper}>
          <Typography
            variant="h6"
            className={classes.typography}
          >{`Email: ${currenUser.email}`}</Typography>
        </Paper>
        <Button
          type="button"
          variant="contained"
          color="primary"
          style={{ width: "52%", marginTop: "5%" }}
          onClick={showUpdateUserFormHandler}
        >
          Update Your Account
        </Button>
        <Button
          type="button"
          variant="contained"
          color="primary"
          style={{ width: "52%", marginTop: "5%" }}
          onClick={userPostsHandler}
        >
          View Your Post
        </Button>

        <Button
          type="button"
          variant="contained"
          color="secondary"
          style={{ width: "52%", marginTop: "5%" }}
          onClick={showCloseModalHandler}
        >
          Close This Account
        </Button>
      </Grid>
    </>
  );
}

export default AboutUser;
