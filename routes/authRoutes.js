const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// GET Auth Page
router.get("/", authController.showAuthPage);

// POST Signup
router.post("/signup", authController.signupUser);

// POST Signin
router.post("/signin", authController.signinUser);

module.exports = router;
