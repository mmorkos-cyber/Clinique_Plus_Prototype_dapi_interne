const express = require("express");

const {connexion} = require('./init-bd'); // recuperation des fonctions 
let db = connexion();

const app = express();

app.use(express.json());  // Pour permettre à Express de parser le JSON envoyé par Bruno

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


app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});