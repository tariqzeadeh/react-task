import axios from "axios";

const API_URL = `${process.env.REACT_APP_SERVER_URL}/auth/`;
class AuthService {
  async login(email, password) {
    try {
      const result = await axios.post(API_URL + "sign-in", {
        email,
        password,
      });

      const resultInfo = await result.data;
      if (typeof resultInfo === "string") {
        return { message: resultInfo };
      }
      if (resultInfo.accessToken) {
        localStorage.setItem("user", JSON.stringify(resultInfo));
      }
      return resultInfo;
    } catch (err) {
      console.log(err);
      return {
        error: {
          message: err.message,
        },
      };
    }
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(name, email, password, role) {
    try {
      const result = await axios.post(API_URL + "sign-up", {
        name,
        email,
        password,
        role: role || "User",
      });
      const resultInfo = await result.data;
      console.log(resultInfo);
      console.log(typeof resultInfo);
      if (typeof resultInfo === "string") {
        return { message: resultInfo };
      }
      if (resultInfo.accessToken) {
        localStorage.setItem("user", JSON.stringify(resultInfo));
      }
      return resultInfo;
    } catch (err) {
      console.log(err);
      return {
        error: {
          message: "This Email Is Already Used",
        },
      };
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
