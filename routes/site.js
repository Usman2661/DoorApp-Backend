const express = require("express");
const router = express.Router();
const SiteController = require ("../controllers/site")
const checkAuth = require("../middleware/checkAuth");
const uploadImage = require("../middleware/multer");

router.post("/site" , checkAuth , uploadImage.saveToUploads, SiteController.createSite);
router.get("/sites" , checkAuth , SiteController.getSites);

module.exports = router;
