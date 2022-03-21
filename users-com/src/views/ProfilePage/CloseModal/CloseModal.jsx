import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Button } from "@material-ui/core";
import axios from "axios";
import authHeader from "../../../services/auth-headers";
import authService from "../../../services/auth.service";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "43rem",
    height: "12rem",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function CloseModal(props) {
  const history = useNavigate();
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const { showCloseModal, showCloseModalHandler } = props;
  const currentUser = authService.getCurrentUser().user;

  const deleteUserHandler = async () => {
    const DELETE_USER_API = `${process.env.REACT_APP_SERVER_URL}/users/delete/${currentUser.id}`;
    const options = {
      method: "delete",
      url: DELETE_USER_API,
      headers: authHeader(),
    };

    try {
      const result = await axios.request(options);
      const deleteInfo = await result.data;
      console.log(deleteInfo);
      if (deleteInfo.message) {
        authService.logout();
        history("/sign-up");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Delete Account Confirmation</h2>
      <p id="simple-modal-description">
        Are You Sure That You Want To Close This Account?
      </p>
      <Button
        variant="contained"
        color="secondary"
        onClick={deleteUserHandler}
        style={{ marginRight: "58%" }}
      >
        Close Account
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={showCloseModalHandler}
      >
        Cancel
      </Button>
    </div>
  );

  return (
    <div>
      <Modal
        open={showCloseModal}
        onClose={showCloseModalHandler}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
