// Importation du module sqlite3
const sqlite3 = require("sqlite3");


//la connection qui permet de create, modifer et lire des table
function connexion(){
    const db = new sqlite3.Database("clinique_plus.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
    return db;
}

let db = connexion();
//creation de la table utilisateurs
const creationUsers = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mail TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL
);`;

//insert d'elements dans la table utilisateurs
const insertUsers = `INSERT OR IGNORE INTO users (mail, password, role)
Values ('mario@hotmail.com', '12345', 'PDG'),('malick@gmail.com', '123456', 'admin'),('cedric@hotmail.com', '123', 'Péon'),('sophian@hotmail.com', '12', 'Stagiaire');`;

//message d'erreur ou success pour les requettes SQL
function executer(sql){
    return new Promise((resolve, reject)  =>{
        db.run(sql, (err) => {
            if (err){
                console.log(err.message);
            }else {
                console.log("SQL execute");
                resolve();
            }
        });
    });
}

//message d'erreur ou success pour la fermeture de la connexion
function fermerConnexion(){
    return new Promise ((resolve, reject) =>{
        db.close((err) =>{
            if (err){
                console.error('erreur de fermeture de connexion', err.message);
            }else{
                console.log('connexion fermée.');
                resolve();
            }
        });
    });
}

//utilisation de fonction async pour attendre un evenment avant d'executer les fonctions callback
(async () => {
    try {
        await executer(creationUsers);
        await executer(insertUsers);
        //await fermerConnexion();
    }
    catch (err){
        console.log(err);
    }
})();

//export la fonction connexion
module.exports = { connexion };