const express = require("express");
const router = express.Router();
const DoorController = require ("../controllers/door");
const checkAuth = require("../middleware/checkAuth");


router.post("/door" , checkAuth, DoorController.createDoor);

module.exports = router;
