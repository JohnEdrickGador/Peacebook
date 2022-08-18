import { signUp, login, checkIfLoggedIn, SubmitPost, GetPosts, EditPost, GetFriends, GetUserPosts, DeletePost, Search, RecommendFriends, SendFriendRequest} from "./controller.js";

const setUpRoutes = (app) => {
  app.post("/signup", signUp);
  app.post("/login", login);
  app.post("/checkifloggedin", checkIfLoggedIn);
  app.post("/submitPost", SubmitPost);
  app.post("/GetPosts", GetPosts);
  app.post("/GetUserPosts", GetUserPosts);
  app.post("/EditPost",EditPost);
  app.post("/GetFriends", GetFriends);
  app.post("/DeletePost", DeletePost);
  app.post("/Search",Search),
  app.post("/RecommendFriends", RecommendFriends);
  app.post("/SendFriendRequest", SendFriendRequest);
}

export default setUpRoutes;