const {login, ajouterUtilisateur, modifierUtilisateur, utilisateurById, getAllUser, deleteUtilisateur} = require('../Models/utilisateursModel')

//Section connexion R
exports.connexion = async (req,res) =>{
    const utilisateurMail = req.body.mail;
    const utilisateurPassword = req.body.password;
    const utilisateur = await login(utilisateurMail, utilisateurPassword);

    //test de input vide
    if (!utilisateurMail || !utilisateurPassword){
        return res.status(400).json({
            "message":"les champs sont vides"
        });
    }


    if(!utilisateur){
        //user n'existe pas
        return res.status(404).json({"message":"l'utilisateur n'existe pas"})
    }else{
        return res.status(200).json({
            "message": "connexion reussie",
            "user" : {
                "id": utilisateur.id,
                "mail": utilisateur.mail,
                "role": utilisateur.role
            }
        })
    }

}


//Section Creation utilisateur C
exports.creation = async (req,res) =>{
    const utilisateurMail = req.body.mail;
    const utilisateurPassword = req.body.password;
    const utilisateurRole = req.body.role;

   const utilisateur = await ajouterUtilisateur(utilisateurMail, utilisateurPassword, utilisateurRole);


   if (utilisateur == 0){
    return res.status(500).json({"message":"utilisateur non ajouté"});
   }

   return res.status(200).json({
            "message": "utilisateur ajouté",
            "user" : {
                "id": utilisateur,
                "mail": utilisateurMail,
                "password": utilisateurPassword,
                "role": utilisateurRole
            }
        })
}

// Section modification utilisateur U
exports.modification = async (req,res) => {
    const utilisateurId = req.body.id
    const utilisateurMail = req.body.mail;
    const utilisateurPassword = req.body.password;
    const utilisateurRole = req.body.role;

    const utilisateur = await modifierUtilisateur(utilisateurId, utilisateurMail, utilisateurPassword, utilisateurRole);
    if (utilisateur == 0){
        return res.status(501).json({
            "message": "utilisateur non modifié",
            "user": utilisateur
        })
    }else{
        return res.status(200).json({
            "message": "utilisateur modifié",
            "user" : {
                "Nouveau mail": utilisateurMail,
                "Nouveau password": utilisateurPassword,
                "Nouveau role": utilisateurRole
            }
        })
    }
}

// Section pour afficher tous les utilisateurs
exports.afficherTout = async (req,res) => {
    const tout = await getAllUser();
    return res.status(200).json({
            "user" : tout
        })
}

// Section pour supprimer un utilisateur
exports.supprimerUtilisateur = async (req,res) => {
    const utilisateurMail = req.params.mail;
    console.log(utilisateurMail);
    const supprimer = await deleteUtilisateur(utilisateurMail);

    if (supprimer == 0){
    return res.status(500).json({"message":"utilisateur non supprimé"});
   }else{
        return res.status(200).json({
            "message": "utilisateur supprimé",
            
        })
    }
}