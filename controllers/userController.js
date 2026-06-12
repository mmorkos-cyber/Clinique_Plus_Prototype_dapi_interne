
const { login, getUserById, ajouterUser, listUsers, deleteUser, majUser } = require('../userModel');  //recuperation des fonctions 


exports.login = async (req, res) => {
    const mail = req.body.mail;
    const password = req.body.password;
    const user = await login(mail, password);

    if (!user) {
        return res.status(500).json({ "message": "Erreur base de données" });
    }

    return res.status(200).json({
        "message": "Connexion réussie",
        "user": {
            "id": user.id,
            "mail": user.mail,
            "role": user.role
        }
    });
}


// rechercher un user avec son ID 
exports.getUserById = async (req, res) => {
    const userId = req.params.userId;

    const user = await getUserById(userId);

    if (!user) {
        return res.status(500).json({ "message": "Erreur base de données" });
    }

    return res.status(200).json({
        "message": "Utilisateur trouvé",
        "user": {
            "id": user.id,
            "mail": user.mail,
            "role": user.role
        }
    });

}


// Ajouter un utilisateur 
exports.ajouterUser = async (req, res) => {
    const mail = req.body.mail;
    const password = req.body.password;
    const role = req.body.role;

    const user = await ajouterUser(mail, password, role);
    if (!user) {
        return res.status(500).json({
            message: "Erreur base de données"
        });
    }
    if (user == 0)
        return res.status(500).json({ "message": "Utilisateur non ajouté" });

    return res.status(200).json({
        "message": "Utilisateur ajouté avec succés",
        "user": {
            "id": user,
            "mail": mail,
            "password": password,
            "role": role
        }
    });
}

// Tous les utilisateurs 
exports.listUsersRoute = async (req, res) => {
    console.log("----- Fonction liste des utilisateurs -------");
    const users = await listUsers();
    if (users.length === 0) {
        return res.status(200).json({ "message": "Aucun utilisateur trouvé", "users": [] });
    }
    return res.status(200).json({
        "message": "Utilisateurs trouvés",
        "users":
            users
    });
}

// Suppression utilisateur
exports.deleteUserRoute = async (req, res) => {
    const userId = req.params.userId;
    const result = await deleteUser(userId);
    if (result.changes != 1) { // 1 Suppression effective, 0 Erreur de suppression 
        return res.status(500).json({ "message": "Identifiant inexistant" });
    }
    return res.status(200).json({
        "message": "Utilisateur supprimé avec succés",
    });
}
// Mis à jour users 

exports.majUserRoute = async (req, res) => {
    const mail = req.body.mail;
    const password = req.body.password;
    const role = req.body.role;
    const id = req.body.id;
    const result = await majUser(mail, password, role, id);
    if (result.changes != 1) {  // 1 Suppression effective, 0 Erreur de suppression 
        return res.status(500).json({ "message": "erreur de mise à jour" });
    }
    return res.status(200).json({
        "message": "Utilisateur mis à jour avec succés",
    });
}