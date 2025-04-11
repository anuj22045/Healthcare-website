// const multer = require("multer");
// const path = require("path");

// // Storage setup
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Make sure 'uploads/' folder exists
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// // File filter (only image/pdf allowed)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|pdf/;
//   const extName = allowedTypes.test(
//     path.extname(file.originalname).toLowerCase()
//   );
//   const mimeType = allowedTypes.test(file.mimetype);

//   if (extName && mimeType) {
//     return cb(null, true);
//   } else {
//     cb(new Error("Only images and PDF allowed!"));
//   }
// };

// // Export multer middleware
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB limit
//   },
// });

// module.exports = upload;
