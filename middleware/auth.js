// // middleware/auth.js

// function isAuthenticated(req, res, next) {
//   if (req.session && req.session.userId) {
//     return next();
//   }
//   res.redirect("/login");
// }

// function ensurePatient(req, res, next) {
//   if (req.session && req.session.userRole === "patient") {
//     return next();
//   }
//   res.status(403).send("Access Denied: Patients only.");
// }

// module.exports = {
//   isAuthenticated,
//   ensurePatient,
// };

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect("/login");
}

function ensurePatient(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === "patient") {
    return next();
  }
  res.status(403).send("Access Denied: Patients only.");
}

function ensureDoctor(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === "doctor") {
    return next();
  }
  res.status(403).send("Access Denied: Doctors only.");
}

module.exports = {
  isAuthenticated,
  ensurePatient,
  ensureDoctor,
};
