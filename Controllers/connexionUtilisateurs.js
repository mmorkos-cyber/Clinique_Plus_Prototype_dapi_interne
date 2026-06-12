const model = require('./connexionModels')

exports.connexion = (req,res) =>{
    
    //test de input vide
    if (!mail || !password){
        return res.status(400).json({
            "message":"les champs sont vides"
        });
    }
    
    if(!rows){
        //user n'existe pas
        return res.status(404).json({"message":"l'utilisateur n'existe pas"})
    }else{
        return res.status(200).json({
            "message": "connexion reussie",
            "user" : {
                "id": rows.id,
                "mail": rows.mail,
                "role": rows.role
            }
        })
    }

}