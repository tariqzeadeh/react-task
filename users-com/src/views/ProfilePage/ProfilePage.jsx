import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Container,
} from "@material-ui/core";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import authHeader from "../../services/auth-headers";
import authService from "../../services/auth.service";
import AboutUser from "./AboutUser/AboutUser";
import Posts from "../Posts/Posts";
import CloseModal from "./CloseModal/CloseModal";

function Profile() {
  const [showUpdateUserForm, setShowUpdateUserForm] = useState(false);
  const [showSuccessful, setShowSuccessful] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [showUserPosts, setShowUserPosts] = useState(true);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [reRender, setReRender] = useState(false);
  const currentUser = authService.getCurrentUser().user;
  const users = [currentUser]

  const showUpdateUserFormHandler = () => {
    setShowUserPosts((prev) => (prev === true ? false : prev));
    setShowCloseModal((prev) => (prev === true ? false : prev));
    setShowUpdateUserForm((prev) => !prev);
  };

  const showCloseModalHandler = () => {
    setShowUpdateUserForm((prev) => (prev === true ? false : prev));
    setShowUserPosts((prev) => (prev === true ? false : prev));
    setShowCloseModal((prev) => !prev);
  };

  const userPostsHandler = () => {
    setShowUpdateUserForm((prev) => (prev === true ? false : prev));
    setShowCloseModal((prev) => (prev === true ? false : prev));
    setShowUserPosts((prev) => !prev);
  };

  const reRenderHandler = () => {
    setReRender((prev) => !prev);
  };

  useEffect(() => {
    async function getUserPosts() {
      const USER_POSTS_API = `${process.env.REACT_APP_SERVER_URL}/posts/list?query=allUserPosts&userId=${currentUser.id}`;
      const options = {
        method: "get",
        url: USER_POSTS_API,
        headers: authHeader(),
      };
      try {
        const result = await axios.request(options);
        const userPosts = await result.data;
        console.log(currentUser);
        setUserPosts(userPosts);
      } catch (err) {
        console.log(err);
      }
    }
    getUserPosts();
  }, [reRender]);

  const updateUserHandler = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const userName = name !== "" ? name : currentUser.name;
    const email = data.get("email");
    const userEmail = email !== "" ? email : currentUser.email;
    const password = data.get("password");
    const userPassword = password !== "" ? password : "same";
    const role = currentUser.role;

    const UPDATE_USER_API = process.env.REACT_APP_SERVER_URL + "/users/update";
    const userData = {
      id: currentUser.id,
      name: userName,
      email: userEmail,
      password: userPassword,
      role: role,
    };
    const options = {
      method: "put",
      url: UPDATE_USER_API,
      headers: authHeader(),
      data: userData,
    };
    try {
      const result = await axios.request(options);
      const userInfo = await result.data;
      if (userInfo.id) {
        setShowSuccessful(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Grid container direction="column" sx={{ mt: 3 }}>
        <Grid item container spacing={1}>
          <Grid item xs={12} sm={4}>
            <div style={{ marginBottom: "5%" }}>
              <AboutUser
                showUpdateUserFormHandler={showUpdateUserFormHandler}
                userPostsHandler={userPostsHandler}
                showCloseModalHandler={showCloseModalHandler}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={8}>
            <div style={{ marginTop: "15%" }}>
              {showUpdateUserForm && (
                <>
                  <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <Box
                      sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography component="h1" variant="h5" color="primary">
                        You can fill the fields that you want to update
                      </Typography>
                      <Box
                        component="form"
                        noValidate
                        sx={{ mt: 3 }}
                        onSubmit={updateUserHandler}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              autoComplete="given-name"
                              name="name"
                              fullWidth
                              id="name"
                              label="Name"
                              autoFocus
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              id="email"
                              label="Email Address"
                              name="email"
                              autoComplete="email"
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              id="password"
                              autoComplete="new-password"
                              variant="outlined"
                            />
                          </Grid>
                          {showSuccessful && (
                            <Grid
                              item
                              container
                              xs={12}
                              textAlign="center"
                              justifyContent="center"
                            >
                              <Typography
                                component="h6"
                                variant="h6"
                                color="primary"
                                textAlign="center"
                              >
                                User Information updated successfully
                              </Typography>
                            </Grid>
                          )}
                        </Grid>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          style={{ marginTop: "5%" }}
                        >
                          Confirm
                        </Button>
                        <Grid container justifyContent="flex-end">
                          <Grid item></Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Container>
                </>
              )}
              {showUserPosts && (
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h3" color="primary">
                    You'r posts
                  </Typography>
                  {userPosts.map((post) => {
                    return (
                      <Posts
                        post={post}
                        users={users}
                        reRenderHandler={reRenderHandler}
                      />
                    );
                  })}
                </Box>
              )}
              {showCloseModal && (
                <CloseModal
                  showCloseModal={showCloseModal}
                  showCloseModalHandler={showCloseModalHandler}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Profile;
