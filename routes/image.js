const express = require("express");
const router = express.Router();
const ImageController = require ("../controllers/image");
const imageUpload = require("../middleware/multer");
const checkAuth = require("../middleware/checkAuth");


router.post("/image" ,checkAuth, imageUpload.saveToUploads , ImageController.image);

module.exports = router;
