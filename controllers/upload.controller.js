const cloudinary = require('../config/cloudinary');
const fs = require('fs');

exports.uploadFile = async (req, res) => {
  try {
    console.log("📁 File path:", req.file?.path);
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
    });

    // ✅ Console Log the Result
    console.log("✅ Cloudinary Upload Result:");
    console.log(result);

    // ✅ Delete local file after upload
    fs.unlinkSync(req.file.path);

    // ✅ Return upload success
    res.send("File uploaded successfully. File URL: " + result.secure_url);
    
    // OR if using EJS rendering:
    // res.render('home', { fileUrl: result.secure_url });

  } catch (error) {
    console.error("❌ Upload Failed:", error);
    res.status(500).send("Upload failed.");
  }
};
