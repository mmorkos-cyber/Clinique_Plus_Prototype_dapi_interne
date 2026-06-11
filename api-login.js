const express = require("express");

const {connexion} = require('./init-bd');  //recuperation des fonctions 

let db = connexion();

const app = express();

// Pour permettre à Express de parser le JSON envoyé par Bruno
app.use(express.json());  

app.post("/login", (req,res) =>{
   const mail = req.body.mail;
   const password = req.body.password;
   
let reqSql = `select id,mail,role from users where mail=? and password=?`;

db.get(reqSql, [mail, password], (err, rows) => {
    if(err)
    {
        return res.status(500).json({"message" : "Erreur base de données"});
    }
    
    if(!rows) {  // Identifiants non trouvés
        return res.status(200).json({"message": "Identifiants invalides"});
    }
    return res.status(200).json({"message" : "Connexion réussie",
         "user" : {
            "id":rows.id,
            "mail" : rows.mail,
            "role":rows.role } 
        });
    
});

})
// rechercher un user avec son ID 
app.get('/users/:userId', (req, res) => {
     const userId = req.params.userId;
     let reqSql = `select id,mail,role from users where id=?`;

db.get(reqSql, [userId], (err, rows) => {
    if(err)
    {
        return res.status(500).json({"message" : "Erreur base de données"});
    }
    
    if(!rows) {  // Utilisateur non trouvé
        return res.status(404).json({"message": "Utilisateur non trouvé"});
    }
    return res.status(200).json({"message" : "Utilisateur trouvé",
         "user" : {
            "id":rows.id,
            "mail" : rows.mail,
            "role":rows.role } 
        });
    
});
});

// Ajouter un utilisateur 

app.post("/add-user", (req,res) =>{
   const mail = req.body.mail;
   const password = req.body.password;
   const role = req.body.role ;
   db.run("INSERT OR IGNORE INTO users (mail, password, role) VALUES (?, ?, ?) ;", [mail, password, role], function (err) {
        if (err) {
            return res.status(500).json({
                message: "Erreur base de données"
            });
        }
        if(this.lastID == 0)
            return res.status(500).json({"message": "Utilisateur non ajouté"}); 

    return res.status(200).json({"message" : "Utilisateur ajouté avec succés",
         "user" : {
            "id" : this.lastID,
            "mail" :mail,
            "password" : password,
            "role" : role
         } 
        });
});
})

// Lister tous les utilisateurs 



app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});