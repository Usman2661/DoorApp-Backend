const express = require("express");
const router = express.Router();
const UserController = require ("../controllers/user");


router.post("/register" , UserController.createUser);
router.post("/login" , UserController.getUser);
router.get("/users" , UserController.getUsers);

module.exports = router;