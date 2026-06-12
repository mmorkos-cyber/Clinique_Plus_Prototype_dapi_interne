// Importation du module sqlite3
const sqlite3 = require("sqlite3");
//Ouvrir une connexion
function connexion() {
    const db = new sqlite3.Database("clinique_plus.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
    return db
}

let db = connexion();

const sqlCreate = `CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mail TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT NOT NULL
);`;

const sqlInsert = `INSERT OR IGNORE INTO users (mail, password, role)
VALUES ('admin@cliniqueplus.fr', 'azerty', 'admin'),('secretaire@cliniqueplus.fr', 'azerty', 'staff');`;

function executer(sql) {

    return new Promise((resolve, reject) => {
        db.run(sql, (err) => {
            if (err) {
                console.log(err.message);
                return reject(err);
            }
            else {
                console.log("SQL éxécute avec succés");
                resolve();
            }
        });
    });
}
function fermerConnexion() {
    return new Promise((resolve, reject) => {
        db.close((err) => {
            if (err) {
                console.error('Erreur de fermeture de la connexion:', err.message);
                return reject(err);
            } else {
                console.log('Connexion fermée.');
                resolve();
            }
        });
    });
}


function login(mail, password) {
    let reqSql = `select id,mail,role from users where mail=? and password=?`;
    return new Promise((resolve, reject) => {
        db.get(reqSql, [mail, password], (err, rows) => {
            if (err) {
                console.log(err.message);
                return reject(err);
            }
            if (rows) {
                console.log(rows);
                resolve(rows);
            }
        });
    });
}

function getUserById(userId) {
    let reqSql = `select id,mail,role from users where id=?`;
    return new Promise((resolve, reject) => {
        db.get(reqSql, [userId], (err, rows) => {
            if (err) {
                console.log(err.message);
                return reject(err);
            }
            if (rows) {
                console.log(rows);
                resolve(rows);
            }
        });
    });
}

function ajouterUser(mail, password, role) {
    return new Promise((resolve, reject) => {
        db.run("INSERT OR IGNORE INTO users (mail, password, role) VALUES (?, ?, ?) ;",
            [mail, password, role], function (err) {
                if (err) {
                    console.log(err.message);
                    return reject(err);
                }
                else {
                    console.log("Utilisateur ajouté avec succés");
                    resolve(this.lastID);
                }
            });
    });
}

function listUsers() {
     let reqSql = `select id,mail,role from users`;
    return new Promise((resolve, reject) => {
        db.get(reqSql, (err, rows) => {
            if (err) {
                console.log(err.message);
                return reject(err);
            }
            if (rows) {
                console.log(rows);
                resolve(rows);
            }
        });
    });
}

(async () => {
    try {
        await executer(sqlCreate);
        await executer(sqlInsert);
        //await fermerConnexion();
    }
    catch (err) {
        console.log(err);
    }
})();


module.exports = { connexion, login, getUserById, ajouterUser,listUsers }; // partager la fonctions connexion