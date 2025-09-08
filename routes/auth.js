// routes/auth.js
const express = require("express");
const router = express.Router();
const { register, login, forgotPassword, resetPassword, getMe, dashboard } = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot", forgotPassword);
router.post("/reset/:token", resetPassword);
router.get("/dashboard",  dashboard);


// ✅ New route for logged-in user
router.get("/me", authMiddleware, getMe);

module.exports = router;
