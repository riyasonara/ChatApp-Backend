import express from "express";
import {
  acceptFriendRequest,
  getMyFriends,
  getMyNotifications,
  getMyProfile,
  login,
  logout,
  searchUser,
  sendRequest,
} from "../controllers/user.js";
import { singleAvatar } from "../middleware/multer.js";
import { newUser } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";
import {
  validateRegister,
  validateHandler,
  validateLogin,
  sendRequestValidator,
  acceptRequestValidator,
} from "../lib/validators.js";

const app = express.Router();

app.post("/new", singleAvatar, validateRegister(), validateHandler, newUser);
app.post("/login", validateLogin(), validateHandler, login);

// From here user must be logged in to access the routes
app.use(isAuthenticated);
app.get("/me", getMyProfile);
app.get("/logout", logout);
app.get("/search", searchUser);
app.put("/sendrequest", sendRequestValidator(), validateHandler, sendRequest);
app.put(
  "/acceptrequest",
  acceptRequestValidator(),
  validateHandler,
  acceptFriendRequest
);
app.get("/notifications", getMyNotifications);
app.get("/getfriends", getMyFriends);

export default app;
