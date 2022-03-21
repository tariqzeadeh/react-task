import React, { useState, useEffect, useRef } from "react";
import { Typography, Box, TextField, Button, Grid } from "@material-ui/core";
import axios from "axios";
import Posts from "../Posts/Posts";
import authHeader from "../../services/auth-headers";
import authService from "../../services/auth.service";
import CssBaseline from "@mui/material/CssBaseline";

function Home() {
  const POSTS_API_URL =
    process.env.REACT_APP_SERVER_URL + "/posts/list?query=allPosts";

  const Users_API_URL = process.env.REACT_APP_SERVER_URL + "/users";

  const CREATE_POST_API = process.env.REACT_APP_SERVER_URL + "/posts/new-post";

  const currentUser = authService.getCurrentUser();

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [reRender, setReRender] = useState(false);
  const textRef = useRef();

  useEffect(() => {
    const getUsers = async () => {
      const options = {
        method: "get",
        url: Users_API_URL,
        headers: authHeader(),
      };
      const usersApi = await axios.request(options);
      const usersInfo = await usersApi.data;
      console.log(usersInfo);
      setUsers(usersInfo);
    };
    getUsers();
    const getPosts = async () => {
      const options = {
        method: "get",
        url: POSTS_API_URL,
        headers: authHeader(),
      };
      const postsApi = await axios.request(options);
      const postsInfo = await postsApi.data;
      console.log(postsInfo);
      setPosts(postsInfo);
    };
    getPosts();
  }, [reRender, POSTS_API_URL, Users_API_URL]);

  const reRenderHandler = () => {
    setReRender((prev) => !prev);
  };

  const addPostHandler = async (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    const post = data.get("post");

    const postData = {
      userId: currentUser.user.id,
      body: post,
    };
    const options = {
      method: "post",
      url: CREATE_POST_API,
      headers: authHeader(),
      data: postData,
    };
    try {
      const result = await axios.request(options);
      const postInfo = await result.data;
      console.log(" New Post => " + postInfo);
      reRenderHandler();
    } catch (err) {
      console.log(err);
    }
    textRef.current.value = "";
  };
  return (
    <>
      <CssBaseline />
      <Grid container direction="column" sx={{ mt: 3 }}>
        <Grid item container spacing={1}>
          <Grid item xs={0} sm={2}></Grid>
          <Grid item xs={12} sm={8}>
            <div style={{ marginBottom: "5%" }}>
              <Typography
                variant="h2"
                color="primary"
                style={{ marginLeft: "20%" }}
              >
                Type what are you thinking
              </Typography>
              <Box
                onSubmit={addPostHandler}
                component="form"
                noValidate
                sx={{ mt: 3 }}
              >
                <TextField
                  name="post"
                  label="Post"
                  type="text"
                  id="post"
                  autoComplete="new-post"
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                  ref={textRef}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Share
                </Button>
              </Box>
            </div>
            {posts.map((post) => {
              return (
                <Posts
                  post={post}
                  users={users}
                  reRenderHandler={reRenderHandler}
                />
              );
            })}
          </Grid>
          <Grid item xs={0} sm={2}></Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
