import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  addMembers,
  deleteGroup,
  getChatDetails,
  getMessages,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
  renameGroup,
  sendAttachments,
} from "../controllers/chat.js";
import { attachmentsMulter } from "../middleware/multer.js";
import {
  validateAddMember,
  validateHandler,
  validateNewGroup,
  validateRemoveMember,
  validateSendAttachments,
  chatIdValidator,
  renameValidator,
} from "../lib/validators.js";

const app = express.Router();

app.use(isAuthenticated);

app.post("/new", validateNewGroup(), validateHandler, newGroupChat);

app.get("/my", getMyChats);

app.get("/my/groups", getMyGroups);

app.put("/addmembers", validateAddMember(), validateHandler, addMembers);

app.put("/removemember", validateRemoveMember(), validateHandler, removeMember);

app.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup);

// send attachments
app.post(
  "/message",
  attachmentsMulter,
  validateSendAttachments(),
  validateHandler,
  sendAttachments
);

// Get Messages
app.get("/message/:id", chatIdValidator(), validateHandler, getMessages);

// Get ChatDetails , rename , delete
app
  .route("/:id")
  .get(chatIdValidator(), validateHandler, getChatDetails)
  .put(renameValidator(), validateHandler, renameGroup)
  .delete(chatIdValidator(), validateHandler, deleteGroup);

export default app;
