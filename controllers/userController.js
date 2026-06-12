
const { connexion, login, getUserById, ajouterUser,listUsers } = require('../userModel');  //recuperation des fonctions 


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
exports.listUsers = async (req, res) => {
    const users = await listUsers();
    console.log(users);
   /* if (!users) {
        return res.status(500).json({ "message": "Erreur base de données" });
    }*/
    return res.status(200).json({
        "message": "Utilisateur trouvé",
       /* "users": {
            users
        }*/
    });
}
