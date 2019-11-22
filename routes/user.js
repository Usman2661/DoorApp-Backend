const express = require("express");
const router = express.Router();
const UserController = require ("../controllers/user")

router.post("/register" , UserController.createUser);
router.get("/register" , UserController.getUser);


module.exports = router;
