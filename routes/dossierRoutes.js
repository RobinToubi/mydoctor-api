const Router = require("express").Router;
const DossierController = require("../controllers/DossierController");
const auth = require('../middlewares/auth');

const router = Router();

router.get("/api/dossier", auth, DossierController.getAllDossier);
router.get("/api/dossier/:dossierId", auth, DossierController.getDossierById);
router.post("/api/dossier", auth, DossierController.createDossier);
router.put("/api/dossier/:dossierId", auth, DossierController.updateDossier);
router.delete("/api/dossier/:dossierId", auth, DossierController.deleteDossier);

module.exports = router;