function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect("/login");
}

//ye patient ja middle ware hai
function ensurePatient(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === "patient") {
    return next();
  }
  res.status(403).send("Access Denied: Patients only.");
}

//ye doctor ka middleware hai
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
