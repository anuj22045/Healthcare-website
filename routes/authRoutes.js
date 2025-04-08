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

// const express = require("express");
// const router = express.Router();
// const authController = require("../controllers/authController");

// // GET Auth Page
// router.get("/", authController.showAuthPage);

// // POST Signup
// router.post("/signup", authController.signupUser);

// // POST Signin
// router.post("/signin", authController.signinUser);

// // 🔓 Logout Route
// router.get("/logout", (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       console.log("Logout error:", err);
//       return res.redirect("/patient");
//     }
//     res.redirect("/login");
//   });
// });

// module.exports = router;
