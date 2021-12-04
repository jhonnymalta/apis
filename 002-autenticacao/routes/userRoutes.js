const router = require("express").Router();

//controller
const userController = require("../controllers/userController");

router.post("/", userController.newUser);

module.exports = router;
