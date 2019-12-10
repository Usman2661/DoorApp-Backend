const express = require("express");
const router = express.Router();
const SiteController = require ("../controllers/site")
const checkAuth = require("../middleware/checkAuth");
const uploadImage = require("../middleware/multer");

router.post("/site" , checkAuth , uploadImage.saveToUploads, SiteController.createSite);
router.get("/sites" , checkAuth , SiteController.getSites);
router.get("/totalsites" , checkAuth , SiteController.totalSites);
router.get("/sitedoors" , checkAuth , SiteController.getSiteDoors);
router.get("/site" , checkAuth , SiteController.getSite);
router.put("/updateSite" , checkAuth , SiteController.updateSite);
router.get("/sitewithmostdoors" , SiteController.getSiteWithMostDoors);


module.exports = router;
