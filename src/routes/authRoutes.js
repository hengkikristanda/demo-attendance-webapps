const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const AccountDispatcher = require("../controllers/AccountDispatcher");

router.use(express.urlencoded({ extended: true }));

//Member Login
router.get("/users/login", AccountDispatcher.getLogin);
router.post("/users/login", AccountDispatcher.postLogin);
router.get("/users/forgot-password", AccountDispatcher.getResetPassword);
router.post("/users/forgot-password", AccountDispatcher.postRequestResetPassword);
router.post("/users/register", AccountDispatcher.postRegisterUser);
router.get("/users/logout", verifyToken, AccountDispatcher.logout);

module.exports = router;
