const router = require("express").Router();

//controller
const candidatosController = require("../controllers/candidatosController");

router.post("/", candidatosController.newCandidato);
router.get("/", candidatosController.getAllCandidatos);
router.get("/:id", candidatosController.getCandidatoById);
router.patch("/:id", candidatosController.editCandidatoById);
router.delete("/:id", candidatosController.deleteCandidatoByID);

module.exports = router;
