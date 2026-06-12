const {connexion} = require('../db.js');
let db = connexion();

function login(mail, password){
    const {mail, password} =req.body;

    let reqSql = `Select id,mail,role,password from users where mail=? and password=?`;
    db.get(reqSql, [mail, password], (err, rows) =>{
        db.close((err) => {
                if (err) {
                    console.error(err.message);
                }
                console.log("Fermeture de la connexion.");
            });

            if (err) {
                console.error(err.message);
                return res.status(500).json({ "message": "Erreur serveur" });
            }
})}

module.exports = {login}