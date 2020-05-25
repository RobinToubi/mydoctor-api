const Router = require("express").Router;
const InterventionController = require("../controllers/InterventionController");
const auth = require('../middlewares/auth');

const router = Router();

router.get('/api/interventions', auth, InterventionController.getInterventions);
router.get('/api/intervention/:interventionId', auth, InterventionController.getIntervention);
router.post('/api/intervention', auth, InterventionController.postIntervention);
router.put('/api/intervention/:interventionId', auth, InterventionController.updateintervention);
router.delete('/api/intervention/:interventionId', auth, InterventionController.deleteIntervention);

module.exports = router;