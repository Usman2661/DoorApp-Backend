const express = require("express");
const router = express.Router();
const DoorController = require ("../controllers/door")

router.post("/door" , DoorController.createDoor);

module.exports = router;
