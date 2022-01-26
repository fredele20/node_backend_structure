const multer = require("multer")
const cloudinary = require("cloudinary")
const cloudinaryStorage = require("multer-storage-cloudinary")
const path = require("path")

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, callback) => {
    let ext = path.extname(file.originalname);
    if(ext !== ".jpg" && ext !== ".jpeg" && ext != ".PNG") {
      callback(new Error("Unsupported file type."), false)
      return
    }
    callback(null, true)
  }
})



// const storage = cloudinaryStorage({
//   folder: "practice",
//   allowedFormats: ["jpg", "png", "jpeg"],

//   transformation: [{
//     width: 500,
//     height: 500,
//     crop: "limit"
//   }],
//   cloudinary: cloudinary
// })

// module.exports = multer({storage: storage})


// const storage2 = multer.diskStorage({
//   destination: function(req, file, callback) {
//     callback(null, "./uploads")
//   },

//   filename: function(req, file, callback) {
//     callback(null, new Date().toISOString() + '-' + file.originalname)
//   }
// })


// const fileFilter = (req, file, callback) => {
//   if(file.mimeype ==="image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
//     callback(null, true)
//   } else {
//     callback({ message: "Unsupported file format" }, false)
//   }
// }

// const upload = multer({
//   storage: storage2,
//   limit: { fileSize: 1024 *1024 },
//   fileFilter: fileFilter
// })

// module.exports = upload;