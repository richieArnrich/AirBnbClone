const imageDownloader = require("image-downloader");
const fs = require("fs");
const uploadByLink = async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
};

const uploadPhoto = (req, res) => {
  console.log(req.files);
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("controllers\\uploads\\", ""));
    console.log(newPath.replace("controllers\\uploads\\", ""));
  }
  res.json(uploadedFiles);
};

const addPlace = (req, res) => {
  
};

module.exports = { uploadByLink, uploadPhoto, addPlace };
