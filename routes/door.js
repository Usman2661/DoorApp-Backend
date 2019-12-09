const express = require("express");
const router = express.Router();
const DoorController = require ("../controllers/door");
const checkAuth = require("../middleware/checkAuth");
const upload = require("../controllers/upload");
const uploadImage = require("../middleware/multer");
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty({
    uploadDir : '../DoorApp-Backend'
});

router.post("/door" , checkAuth,uploadImage.saveToUploads, DoorController.createDoor);
router.get("/doors" , checkAuth, DoorController.getDoors);
router.delete("/door" , checkAuth, DoorController.deleteDoor);
router.get("/door" , checkAuth, DoorController.getDoor);
router.post("/DoorDocument" , DoorController.uploadDoorFile);
router.get("/DoorDocument" , DoorController.getDoorDocuments);
router.get("/totalDoors" , checkAuth, DoorController.totalDoors);
router.post("/upload" , checkAuth , multipartyMiddleware, upload.uploadFile);


module.exports = router;
