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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@material-ui/core/styles";
import authHeader from "../../services/auth-headers";
import axios from "axios";

const useStyle = makeStyles({
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
  avatar: {
    marginLeft: "0.5rem",
  },
  commentsMain: {
    width: "100%",
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
});

function Comments(props) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const { comments, currentUser, users, formatDate, reRenderHandler } = props;
  const classes = useStyle();
  let commentId;
  const UPDATE_COMMENT_API =
    process.env.REACT_APP_SERVER_URL + "/comments/update-comment";
  const userImg =
    "https://tzjoy.121talk.cn/Public/Home/newpage/assets/pages/img/people/img3-large.jpg";

  const deleteComment = async (id) => {
    const DELETE_COMMENT_API = `${process.env.REACT_APP_SERVER_URL}/comments/delete/${id}`;
    const options = {
      method: "delete",
      url: DELETE_COMMENT_API,
      headers: authHeader(),
    };
    try {
      const result = await axios.request(options);
      const postDeleteResult = await result.data;
      console.log(" comment deleted => " + postDeleteResult);
    } catch (err) {
      console.log(err);
    }
    reRenderHandler();
  };

  const updateCommentHandler = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const comment = data.get("comment");
    const commentData = {
      id: commentId,
      body: comment,
    };
    const options = {
      method: "put",
      url: UPDATE_COMMENT_API,
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
    setShowUpdateForm(false);
    reRenderHandler();
  };
  return (
    <>
      {comments.map((comment) => {
        commentId = comment.id;
        const commentOwner = users.find((user) => {
          console.log("Owner Id" + comment.userId);
          return user.id === comment.userId;
        });
        return (
          <>
            <Paper elevation={5} square={true}>
              <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
            </Paper>
            <Grid xs={12} className={classes.commentsMain}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item className={classes.avatar}>
                  <Avatar
                    alt={commentOwner.name}
                    src={userImg}
                  />
                </Grid>
                <Grid justifyContent="flex-start" item xs zeroMinWidth>
                  <Typography variant="h5" className={classes.name}>
                    {commentOwner.name}
                  </Typography>
                  <Typography variant="h6" className={classes.post}>
                    {comment.body}_____"Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum."
                  </Typography>
                  <Typography className={classes.date}>
                    {`Created At ${formatDate(comment.createdAt)}`}
                  </Typography>
                </Grid>
                {currentUser.user.id === comment.userId && (
                  <Grid
                    container
                    item
                    justifyContent="flex-end"
                    xs={1}
                    direction="column"
                    spacing={2}
                  >
                    <IconButton
                      type="button"
                      variant="contained"
                      color="primary"
                      sx={{ mt: 3 }}
                      onClick={() => setShowUpdateForm((prev) => !prev)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      type="button"
                      variant="contained"
                      color="primary"
                      sx={{ mt: 3 }}
                      onClick={() => deleteComment(comment.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
              {showUpdateForm && (
                <Grid className={classes.formGrid} xs={12}>
                  <Box
                    onSubmit={updateCommentHandler}
                    className={classes.form}
                    component="form"
                    noValidate
                    sx={{ mt: 3 }}
                  >
                    <Typography variant="h6">Edit your Post Here</Typography>
                    <TextField
                      name="comment"
                      label="Comment"
                      type="text"
                      id="comment"
                      autoComplete="update-comment"
                      sx={{ mt: 3, mb: 2 }}
                      className={classes.text}
                      defaultValue={comment.body}
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
            </Grid>
          </>
        );
      })}
    </>
  );
}

export default Comments;
