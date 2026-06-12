//importer les dependences 
const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());

const utilisateursRoutes = require('./Routers/utilisateursRoute') 

app.use('/utilisateur', utilisateursRoutes)


app.use(router);
app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});
