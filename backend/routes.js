import { signUp, login, checkIfLoggedIn, SubmitPost, GetPosts} from "./controller.js";

const setUpRoutes = (app) => {
  app.post("/signup", signUp);
  app.post("/login", login);
  app.post("/checkifloggedin", checkIfLoggedIn);
  app.post("/submitPost", SubmitPost);
  app.post("/GetPosts", GetPosts);
}

export default setUpRoutes;