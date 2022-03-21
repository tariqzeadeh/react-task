import React, { useState } from "react";
import {
  Divider,
  Avatar,
  Grid,
  Paper,
  Typography,
  IconButton,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import CssBaseline from "@mui/material/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import AddCommentIcon from "@material-ui/icons/AddComment";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import authHeader from "../../services/auth-headers";
import authService from "../../services/auth.service";
import axios from "axios";
import Comments from "../Comments/Comments";

const useStyle = makeStyles({
  header: {
    alignSelf: "center",
  },
  name: {
    margin: 0,
    textAlign: "left",
  },
  post: {
    textAlign: "left",
  },
  date: {
    textAlign: "left",
    fontSize: "0.8rem",
    color: "grey",
  },
  breakLine: {
    margin: "0.5rem 0",
  },
  avatar: {
    marginLeft: "0.5rem",
  },
  formGrid: {
    transform: " 2s ease-in-out",
  },
  form: {
    textAlign: "center",
    justifyContent: "center",
  },
  text: {
    width: "30rem",
  },
  commentsMain: {
    width: "100%",
  },
});

const formatDate = (date) => {
  const formatedData = new Date(date);
  const stringDate = `${formatedData.getFullYear()}/${formatedData.getMonth()}/${formatedData.getDay()} In ${formatedData.getHours()}:${formatedData.getMinutes()}`;
  return stringDate;
};

function Posts(props) {
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { post, users, reRenderHandler } = props;
  const user = users.find((user) => user.id === post.user_id);
  const classes = useStyle();

  const ADD_COMMENT_API =
    process.env.REACT_APP_SERVER_URL + "/comments/new-comment";

  const UPDATE_POST_API =
    process.env.REACT_APP_SERVER_URL + "/posts/update-post";

  const DELETE_POST_API = `${process.env.REACT_APP_SERVER_URL}/posts/delete-post/${post.id}`;

  const currentUser = authService.getCurrentUser();

  const userImg =
    "https://tzjoy.121talk.cn/Public/Home/newpage/assets/pages/img/people/img3-large.jpg";
  const addCommentHandler = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const comment = data.get("comment");

    const commentData = {
      userId: currentUser.user.id,
      postId: post.id,
      body: comment,
    };
    const options = {
      method: "post",
      url: ADD_COMMENT_API,
      headers: authHeader(),
      data: commentData,
    };
    try {
      const result = await axios.request(options);
      const commentInfo = await result.data;
      console.log(" New Comment => " + commentInfo);
    } catch (err) {
      console.log(err);
    }
    setShowForm(false);
    setShowComments(true);
    reRenderHandler();
  };

  const updatePostHandler = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const comment = data.get("post");

    const postData = {
      id: post.id,
      body: comment,
    };
    const options = {
      method: "put",
      url: UPDATE_POST_API,
      headers: authHeader(),
      data: postData,
    };
    try {
      const result = await axios.request(options);
      const postInfo = await result.data;
      console.log(" post updated => " + postInfo);
    } catch (err) {
      console.log(err);
    }
    setShowUpdateForm(false);
    reRenderHandler();
  };
  const deletePost = async () => {
    const options = {
      method: "delete",
      url: DELETE_POST_API,
      headers: authHeader(),
    };
    try {
      const result = await axios.request(options);
      const postDeleteResult = await result.data;
      console.log(" post deleted => " + postDeleteResult);
    } catch (err) {
      console.log(err);
    }
    reRenderHandler();
  };
  return (
    <>
      <div style={{ padding: "0.5rem" }}>
        <CssBaseline />
        <Typography variant="h2" className={classes.header}></Typography>
        <Paper elevation={3} square={true}>
          <Grid container wrap="nowrap" spacing={1}>
            <Grid item className={classes.avatar}>
              <Avatar alt={user.name} src={userImg} />
            </Grid>
            <Grid justifyContent="flex-start" item xs zeroMinWidth>
              <Typography variant="h3" className={classes.name}>
                {user.name}
              </Typography>
              <Typography variant="h5" className={classes.post}>
                {post.body}_____ "Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum."
              </Typography>
              <Typography className={classes.date}>{`Created At ${formatDate(
                post.createdAt
              )}`}</Typography>
            </Grid>
            <Grid
              container
              item
              justifyContent="flex-end"
              xs={1}
              direction="column"
            >
              <IconButton onClick={() => setShowForm((prev) => !prev)}>
                <AddCommentIcon
                  style={{ fontSize: "1.5rem", alignSelf: "right" }}
                />
              </IconButton>
              <IconButton
                type="button"
                variant="contained"
                color="primary"
                onClick={() => setShowComments((prev) => !prev)}
              >
                <ExpandCircleDownIcon />
              </IconButton>
              {currentUser.user.id === post.userId && (
                <IconButton
                  type="button"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                  onClick={() => setShowUpdateForm((prev) => !prev)}
                >
                  <EditIcon />
                </IconButton>
              )}
              {currentUser.user.id === post.userId && (
                <IconButton
                  type="button"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                  onClick={deletePost}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
          {showForm && (
            <Grid className={classes.formGrid} xs={12}>
              <Box
                onSubmit={addCommentHandler}
                className={classes.form}
                component="form"
                noValidate
                sx={{ mt: 3 }}
              >
                <Typography variant="h6">Type your Comment Here</Typography>
                <TextField
                  name="comment"
                  label="Comment"
                  type="text"
                  id="comment"
                  autoComplete="new-comment"
                  sx={{ mt: 3, mb: 2 }}
                  className={classes.text}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Comment
                </Button>
              </Box>
            </Grid>
          )}
          {showUpdateForm && (
            <Grid className={classes.formGrid} xs={12}>
              <Box
                onSubmit={updatePostHandler}
                className={classes.form}
                component="form"
                noValidate
                sx={{ mt: 3 }}
              >
                <Typography variant="h6">Edit your Post Here</Typography>
                <TextField
                  name="post"
                  label="Post"
                  type="text"
                  id="post"
                  autoComplete="update-post"
                  sx={{ mt: 3, mb: 2 }}
                  className={classes.text}
                  defaultValue={post.body}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Edit
                </Button>
              </Box>
            </Grid>
          )}
          <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
          {showComments && (
            <Comments
              comments={post.comments}
              currentUser={currentUser}
              users={users}
              formatDate={formatDate}
              reRenderHandler={reRenderHandler}
            />
          )}
        </Paper>
      </div>
    </>
  );
}
export default Posts;
