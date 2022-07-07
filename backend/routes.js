import { signUp, login, checkIfLoggedIn } from "./auth-controller.js";

const setUpRoutes = (app) => {
  app.post("/signup", signUp);
  app.post("/login", login);
  app.post("/checkifloggedin", checkIfLoggedIn);
}

export default setUpRoutes;