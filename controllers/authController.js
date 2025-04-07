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

  // Basic signin (you can add bcrypt + JWT later)
  const user = await User.findOne({ email, password });
  if (!user) return res.send("❌ Invalid credentials");

  res.send(`✅ Welcome back, ${user.name}!`);
};
