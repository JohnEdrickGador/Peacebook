import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

// import UserSchema from "./models/user.js";
import "./models/user.js";
import setUpRoutes from "./routes.js";

//connect to mongoDB server
mongoose.connect("mongodb://localhost:27017/AUTH",
{ useNewUrlParser: true, useUnifiedTopology: true },
(err) => {
    if (err) { console.log(err); }
    else { console.log("Successfully connected to Mongo DB"); }
});


// initialize the server
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// allow CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Access-Control-Allow-Methods,Origin,Accept,Content-Type");
    res.setHeader("Access-Control-Allow-Credentials","true");
    next();
  });

// setup routes
setUpRoutes(app);

// start server
app.listen(3001, (err) => {
    if (err) { console.log(err); }
    else { console.log("Server listening at port 3001"); }
  });