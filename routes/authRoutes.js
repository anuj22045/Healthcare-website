const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/login", authController.showAuthPage);
// GET Auth Page
router.get("/", authController.showAuthPage);

// POST Signup
router.post("/signup", authController.signupUser);

// POST Signin
router.post("/signin", authController.signinUser);

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Logout Error:", err);
      return res.send("Error logging out");
    }
    res.redirect("/login");
  });
});

module.exports = router;
