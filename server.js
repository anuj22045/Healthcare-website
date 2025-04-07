const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "MediConnect-project-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
  })
);

let users = [
  { id: 1, username: "anuj", password: "1234" },
  { id: 2, username: "Admin", password: "0000" },
];

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect("/home");
  } else {
    res.redirect("/login");
  }
});

// app.get("/login", (req, res) => {
//   res.render("login", { errorMessage: null });
// });
app.get("/login", (req, res) => {
  res.render("login", { cartCount: 0 });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    req.session.user = {
      id: user.id,
      username: user.username,
    };
    res.redirect("/home");
  } else {
    res.render("login", { errorMessage: "Invalid username or password" });
  }
});

app.get("/signup", (req, res) => {
  res.render("signup", { errorMessage: null });
});

app.post("/signup", (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
    return res.render("signup", { errorMessage: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.render("signup", { errorMessage: "Passwords do not match" });
  }

  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.render("signup", { errorMessage: "Username already exists" });
  }

  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);

  req.session.user = { id: newUser.id, username: newUser.username };
  res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.render("dashboard", { user: req.session.user });
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.get("/home", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.render("home", { user: req.session.user });
});

app.get("/home", (req, res) => {
  const images = [
    "/images/carousel-image-1.jpg",
    "/images/carousel-img-2.jpg",
    "/images/carousel-img-3.jpg",
    "/images/carousel-img-4.jpg",
  ];
  res.render("home", { images });
  console.log(images);
});

app.get("/order-prescription", (req, res) => {
  const steps = [
    "Upload a photo of your prescription",
    "Add delivery address and place the order",
    "We will call you to confirm the medicines",
    "Now, sit back! Your medicines will get delivered at your doorstep",
  ];

  res.render("order-prescription", { steps });
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
