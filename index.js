//importer les dependences 
const express = require("express");
const router = express.Router();
const connex = require('./Models/connexionModel');
const create = require('./Controllers/creationUtilisateur');
const app = express();
app.use(express.json())


router.post('/connexion', connex.connexion);
router.post('/creation', create.creation);


app.use(router)
app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});
