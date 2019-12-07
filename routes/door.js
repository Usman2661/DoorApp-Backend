const express = require("express");
const router = express.Router();
const DoorController = require ("../controllers/door");
const checkAuth = require("../middleware/checkAuth");
const upload = require("../controllers/upload");
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty({
    uploadDir : '../DoorApp-Backend'
});

router.post("/door" , checkAuth, DoorController.createDoor);
router.get("/doors" , checkAuth, DoorController.getDoors);
router.delete("/door" , checkAuth, DoorController.deleteDoor);
router.get("/door" , checkAuth, DoorController.getDoor);
router.post("/DoorDocument" , DoorController.uploadDoorFile);
router.get("/DoorDocument" , DoorController.getDoorDocuments);
router.get("/totalDoors" , checkAuth, DoorController.totalDoors);
router.post("/upload" ,multipartyMiddleware, upload.uploadFile);


module.exports = router;
