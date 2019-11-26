const express = require("express");
const router = express.Router();
const SiteController = require ("../controllers/site")

router.post("/site" , SiteController.createSite);
router.get("/sites" , SiteController.getSites);

module.exports = router;
