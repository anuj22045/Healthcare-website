const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.showAuthPage = (req, res) => {
  res.render("auth");
};

exports.signupUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.send("Please fill all fields");
  }

  try {
    // hash password me convert ho jaega
    const hashedPassword = await bcrypt.hash(password, 10);

    // new user create karega
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    //  Set session
    req.session.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // Redirect krega jo bhi role se login karenge
    if (user.role === "patient") {
      return res.redirect("/patient");
    } else if (user.role === "doctor") {
      return res.redirect("/doctor");
    } else if (user.role === "admin") {
      return res.redirect("/admin");
    } else {
      return res.send(" Unknown role");
    }
  } catch (err) {
    console.error(err);
    res.send(" Error saving user");
  }
};

exports.signinUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send(" Please enter both email and password");
  }

  try {
    // user find karega
    const user = await User.findOne({ email });

    if (!user) {
      return res.send(" Invalid credentials (email)");
    }

    //  Match password karega
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send(" Invalid credentials (password)");
    }

    //
    req.session.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // console.log("SESSION SET:", req.session.user);

    //
    if (user.role === "patient") {
      return res.redirect("/patient");
    } else if (user.role === "doctor") {
      return res.redirect("/doctor");
    } else if (user.role === "admin") {
      return res.redirect("/admin");
    } else {
      return res.send(" Unknown role");
    }
  } catch (error) {
    console.error("Signin Error:", error);
    res.send(" Something went wrong");
  }
};
