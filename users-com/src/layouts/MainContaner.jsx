import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthContextProvider from "../authContext";
// import routes from "../routes";
import Navbar from "../components/navbar/Navbar";
import SignUp from "../views/SignUp-page/SignUpPage";
import SignIn from "../views/SignIn-page/SignInPage";
import Home from "../views/HomePage/HomePage";
import Profile from "../views/ProfilePage/ProfilePage";
import authService from "../services/auth.service";

function MainPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { getCurrentUser } = authService;

  const loggedOutHandler = () => {
    setIsLoggedIn(false);
  };
  const loggedInHandler = () => {
    setIsLoggedIn(true);
  };
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setIsLoggedIn(true);
    }
  }, [getCurrentUser, setIsLoggedIn]);
  return (
    <AuthContextProvider>
      <Navbar isLoggedIn={isLoggedIn} loggedOutHandler={loggedOutHandler} />
      <React.Suspense fallback={<span>Loading...</span>}>
        <Routes>
          <Route
            path="/"
            exact
            element={
              isLoggedIn ? (
                <Home />
              ) : (
                <SignIn loggedInHandler={loggedInHandler} />
              )
            }
          />
          <Route
            path="/home"
            exact
            element={
              isLoggedIn ? (
                <Home isLoggedIn={isLoggedIn} />
              ) : (
                <SignIn loggedInHandler={loggedInHandler} />
              )
            }
          />
          <Route
            path="/profile"
            exact
            element={
              isLoggedIn ? (
                <Profile />
              ) : (
                <SignIn loggedInHandler={loggedInHandler} />
              )
            }
          />
          <Route
            path="/sign-up"
            exact
            element={<SignUp loggedInHandler={loggedInHandler} />}
          />
          <Route
            path="/sign-in"
            exact
            element={<SignIn loggedInHandler={loggedInHandler} />}
          />
          
          {/** For some reason it did'nt work */}
          {/* {routes.map((route) => {
            return (
              <Route
                path={route.path}
                exact={route.isExact}
                element={<route.component />}
                key={route.name}
              />
            );
          })} */}
        </Routes>
      </React.Suspense>
    </AuthContextProvider>
  );
}

export default MainPage;
