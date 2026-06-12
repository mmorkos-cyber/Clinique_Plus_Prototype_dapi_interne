const express = require("express");


const router = express.Router();

const userController = require("../controllers/userController");


// connexion user
router.post("/login", userController.login);

// rechercher un user avec son ID 
router.get('/:userId', userController.getUserById);

// Ajouter un utilisateur 

router.post("/add-user", userController.ajouterUser);

// supprimer un utilisateur 
router.delete('/suppression/:userId', userController.deleteUserRoute);

// Lister les utilisateurs 
router.get("/", userController.listUsersRoute);

// Mise à jour user
router.put("/update", userController.majUserRoute);


module.exports = router;

