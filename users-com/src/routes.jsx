import { lazy } from "react";

const SignUp = lazy(() => {
  import("./views/SignUp-page/SignUpPage");
});

const SignIn = lazy(() => {
  import("./views/SignIn-page/SignInPage");
});

const Home = lazy(() => {
  import("./views/HomePage/HomePage");
});
const Profile = lazy(() => {
  import("./views/ProfilePage/ProfilePage");
});
const routes = [
  {
    path: "/sign-up/*",
    isExact: true,
    component: SignUp,
    name: "signUp",
  },
  {
    path: "/sign-in/*",
    isExact: true,
    component: SignIn,
    name: "signIn",
  },
  {
    path: "/profile/*",
    isExact: true,
    component: Profile,
    name: "profile",
  },
  {
    path: "/home/*",
    isExact: true,
    component: Home,
    name: "home",
  },
];

export default routes;
