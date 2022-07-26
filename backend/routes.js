import { signUp, login, checkIfLoggedIn, SubmitPost } from "./auth-controller.js";

const setUpRoutes = (app) => {
  app.post("/signup", signUp);
  app.post("/login", login);
  app.post("/checkifloggedin", checkIfLoggedIn);
  app.post("/submitPost", SubmitPost);
}

export default setUpRoutes;