const {connexion} = require('../db.js');
let db = connexion();

function login(mail, password){
    let reqSql = `Select id,mail,role,password from users where mail=? and password=?`;
    return new Promise((resolve, reject) => {
        db.get(reqSql, [mail, password], (err, rows) =>{
            if (err) {
                console.error(err.message);
                return reject(err);
            }
            if(rows) {
                console.log(rows);
                resolve(rows);
            }

        })
    })
}


function ajouterUtilisateur(mail, password, role){
    return new Promise((resolve, reject) => {
        db.run("Insert INTO users (mail, password, role) VALUES (?, ?, ?);",
            [mail, password, role], function (err){
                if (err){
                    console.log(err.message);
                    return reject(err);
                }else {
                    console.log("Utilisateur ajouté");
                    resolve(this.lastID);
                }
            }
        )
    })
}


function modifierUtilisateur(userId, mail, password, role){
    return new Promise((resolve, reject) => {
        db.run("UPDATE users SET mail = ?, password = ?, role = ? where id = ?;", 
            [mail, password, role, userId], function (err){
                if (err){
                    console.log(err.message);
                    return reject(err);
                }else {
                    console.log("Utilisateur modifié");
                    resolve(this.changes);
                }
            }
        )
    })
}

function utilisateurById(userId){
    let reqsql = 'SELECT id, mail, role from users where id = ?;';
    return new Promise ((resolve, reject) => {
        db.get(reqsql, [userId], (err,rows) => {
            if (err){
                    console.log(err.message);
                    return reject(err);
            }
            if (rows){
                resolve(rows);
            }
        })
    })
}

function getAllUser(){
    return new Promise ((resolve,reject) => { 
    db.all('SELECT * from users;', (err,rows) => {
            if (err){
                    console.log(err.message);
                    return reject(err);
            }
            if (rows){
                resolve(rows);
            }
        })
    })
}

function deleteUtilisateur(mail){
    return new Promise ((resolve, reject) => {
        db.run('DELETE from users where mail = ?;',[mail], function (err) {
             if (err){
                    console.log(err.message);
                    return reject(err);
                }else {
                    console.log("Utilisateur supprimé");
                    resolve(this.changes);
                }
        })
    })
}

module.exports = {login, ajouterUtilisateur, modifierUtilisateur, utilisateurById, getAllUser, deleteUtilisateur};