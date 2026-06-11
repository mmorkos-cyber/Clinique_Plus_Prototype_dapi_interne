const express = require("express");

const { connexion, login, getUserById } = require('./userModel');  //recuperation des fonctions 

let db = connexion();

const app = express();

// Pour permettre à Express de parser le JSON envoyé par Bruno
app.use(express.json());


app.post("/login", async (req, res) => {
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
})


// rechercher un user avec son ID 
app.get('/users/:userId', async (req, res) => {
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

});

// Ajouter un utilisateur 

app.post("/add-user", (req, res) => {
    const mail = req.body.mail;
    const password = req.body.password;
    const role = req.body.role;
    db.run("INSERT OR IGNORE INTO users (mail, password, role) VALUES (?, ?, ?) ;", [mail, password, role], function (err) {
        if (err) {
            return res.status(500).json({
                message: "Erreur base de données"
            });
        }
        if (this.lastID == 0)
            return res.status(500).json({ "message": "Utilisateur non ajouté" });

        return res.status(200).json({
            "message": "Utilisateur ajouté avec succés",
            "user": {
                "id": this.lastID,
                "mail": mail,
                "password": password,
                "role": role
            }
        });
    });
})

// Lister tous les utilisateurs 

app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});