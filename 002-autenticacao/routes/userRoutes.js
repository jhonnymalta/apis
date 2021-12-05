const router = require("express").Router();

//controller
const userController = require("../controllers/userController");

router.post("/register", userController.newUser);
router.post("/login", userController.userLogin);
router.delete("/:id", userController.deleteUser);

module.exports = router;
