const express = require("express");
const router = express.Router();
const SiteController = require ("../controllers/site")
const checkAuth = require("../middleware/checkAuth");


router.post("/site" , checkAuth , SiteController.createSite);
router.get("/sites" , checkAuth , SiteController.getSites);

module.exports = router;
