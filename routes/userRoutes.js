const express = require("express");


const router = express.Router();

const userController = require("../controllers/userController");


// connexion user
router.post("/login", userController.login);


// rechercher un user avec son ID 
router.get('/:userId', userController.getUserById);

// Ajouter un utilisateur 

router.post("/add-user", userController.ajouterUser);

// Lister les utilisateurs 

router.get("/all", userController.listUsers);

module.exports = router;

