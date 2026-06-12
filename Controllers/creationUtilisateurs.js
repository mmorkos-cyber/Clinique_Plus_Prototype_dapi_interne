exports.creation = (req,res) =>{
    const { mail, password, role } = req.body;

    if (!mail || !password) {
        return res.status(400).json({
            message: "Les champs mail et password sont obligatoires"
        });
    }

    const user = usersTemp.find(user => user.mail === user)
    if(mail !== user.mail){
        return res.status(401).json({
            message: "l'utilisateur existe"
        });
    }

    usersTemp.push({mail : mail, pass: password, role: role})

    return res.status(200).json({
            message: "l'utilisateur est crée"
        });
}