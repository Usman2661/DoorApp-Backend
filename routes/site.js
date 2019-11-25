const express = require("express");
const router = express.Router();
const SiteController = require ("../controllers/site")

router.post("/site" , SiteController.createSite);

module.exports = router;
