const express = require("express");
const router = express.Router();
const UserController = require ("../controllers/user");
const checkAuth = require("../middleware/checkAuth");



router.post("/register" , UserController.createUser);
router.post("/login" , UserController.getUser);
router.get("/user" , checkAuth,  UserController.getSingleUser);

module.exports = router;