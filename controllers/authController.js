const User = require("../models/user");

exports.showAuthPage = (req, res) => {
  res.render("auth");
};

exports.signupUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.send("Please fill all fields");
  }

  try {
    const user = new User({ name, email, password, role });
    await user.save();
    res.send("✅ User signed up successfully!");
  } catch (err) {
    console.error(err);
    res.send("❌ Error saving user");
  }
};

exports.signinUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send("❌ Please enter both email and password");
  }

  try {
    const user = await User.findOne({ email, password }); // 🔐 You should replace this with bcrypt in production

    if (!user) {
      return res.send("❌ Invalid credentials");
    }

    // ✅ Save user in session
    req.session.user = user;

    // ✅ Redirect based on user role
    if (user.role === "patient") {
      return res.redirect("/patient");
    } else if (user.role === "doctor") {
      return res.redirect("/doctor");
    } else if (user.role === "admin") {
      return res.redirect("/admin");
    } else {
      return res.send("❌ Unknown role");
    }
  } catch (error) {
    console.error("Signin Error:", error);
    res.send("❌ Something went wrong");
  }
};
