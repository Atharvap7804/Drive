const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { uploadFile } = require('../controllers/upload.controller');

router.get('/test', (req, res) => {
  console.log("✅ Test route hit!");
  res.send("Test OK");
});


router.post('/', upload.single('file'), (req, res, next) => {
  console.log("📡 Route hit!");
  next();
}, uploadFile);

module.exports = router;
