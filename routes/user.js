const express = require("express");
const router = express.Router();
const UserController = require ("../controllers/user");
const checkAuth = require("../middleware/checkAuth");
const imageUpload = require("../middleware/multer");

router.post("/register" , UserController.createUser);
router.post("/login" , UserController.getUser);
router.get("/totalUsers" , checkAuth,UserController.totalUsers);
router.get("/user" , checkAuth,  UserController.getSingleUser);
router.put("/update" , checkAuth, imageUpload.saveToUploads , UserController.updateUser);


module.exports = router;