const cloudinary = require("cloudinary").v2
const config = require("config")
const upload = require("./multer")



cloudinary.config({
  cloud_name: config.get("cloud_name"),
  api_key: config.get("api_keys"),
  api_secret: config.get("api_secret")
})






// async function upload(file) {
//   return new Promise((resolve) => {
//     cloudinary.uploader.upload(file, (result) => {
//       resolve({
//         url: result.url,
//       })
//     }, {
//       resource_type: "auto",
//       // folder: folder
//     })
//   })
// }

// async function upload(locaFilePath) {
//   // locaFilePath :
//   // path of image which was just uploaded to "uploads" folder

//   var mainFolderName = "main"
//   // filePathOnCloudinary :
//   // path of image we want when it is uploded to cloudinary
//   var filePathOnCloudinary = mainFolderName + "/" + locaFilePath

//   return cloudinary.uploader.upload(locaFilePath,{"public_id":filePathOnCloudinary})
//   .then((result) => {
//     // Image has been successfully uploaded on cloudinary
//     // So we dont need local image file anymore
//     // Remove file from local uploads folder 
//     fs.unlinkSync(locaFilePath)
    
//     return {
//       message: "Success",
//       url:result.url
//     };
//   }).catch((error) => {
//     // Remove file from local uploads folder 
//     fs.unlinkSync(locaFilePath)
//     return {message: "Fail",};
//   });
// }

module.exports = cloudinary;