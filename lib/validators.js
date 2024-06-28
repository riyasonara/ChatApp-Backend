import { body, check, validationResult, param } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);
  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(",");
  if (errors.isEmpty()) {
    return next();
  } else {
    next(new ErrorHandler(errorMessages, 400));
  }
};

const validateRegister = () => [
  body("name", "Please enter Name").notEmpty(),
  body("username", "Please enter username").notEmpty(),
  body("password", "Please enter password").notEmpty(),
  body("bio", "Please enter bio").notEmpty(),
];

const validateLogin = () => [
  body("username", "Please enter username").notEmpty(),
  body("password", "Please enter password").notEmpty(),
];

const validateNewGroup = () => [
  body("name", "Please enter group name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please add Members")
    .isArray({ min: 2, max: 100 })
    .withMessage("Members must be 2 and 100"),
];

const validateAddMember = () => [
  body("chatId", "Please enter chatId").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please add members")
    .isArray({ min: 1, max: 97 })
    .withMessage("Members must be 1 and 97"),
];

const validateRemoveMember = () => [
  body("chatId", "Please enter chatId").notEmpty(),
  body("userId", "Please enter userId").notEmpty(),
];

const validateSendAttachments = () => [
  body("id", "Please enter chatId").notEmpty(),
];

const chatIdValidator = () => [param("id", "Please enter chatId").notEmpty()];

const renameValidator = () => [
  param("id", "Please Enter Chat ID").notEmpty(),
  body("name", "Please Enter New Name").notEmpty(),
];

const sendRequestValidator = () => [
  body("userId", "Please Enter User ID").notEmpty(),
];

const acceptRequestValidator = () => [
  body("requestId", "Please Enter Request ID").notEmpty(),
  body("accept")
    .notEmpty()
    .withMessage("Please Add Accept")
    .isBoolean()
    .withMessage("Accept must be a boolean"),
];

const adminLoginValidator = () => [
  body("secretKey", "Please Enter Secret Key").notEmpty(),
];

export {
  validateRegister,
  validateHandler,
  validateLogin,
  validateNewGroup,
  validateAddMember,
  validateRemoveMember,
  validateSendAttachments,
  chatIdValidator,
  renameValidator,
  sendRequestValidator,
  acceptRequestValidator,
  adminLoginValidator,
};
