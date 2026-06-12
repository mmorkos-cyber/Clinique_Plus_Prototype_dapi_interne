const express = require("express");
const utilisateursController = require('../Controllers/utilisateursController');
const router = express.Router();

router.post('/connexion', utilisateursController.connexion);
router.post('/creation', utilisateursController.creation);
router.put('/modification', utilisateursController.modification);
router.get('/tout', utilisateursController.afficherTout);
router.delete('/supprimer/:mail', utilisateursController.supprimerUtilisateur);

module.exports = router;