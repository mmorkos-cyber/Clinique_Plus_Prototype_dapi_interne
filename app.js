
const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoutes");

// Pour permettre à Express de parser le JSON envoyé par Bruno
app.use(express.json());

app.use("/users", userRoutes);

app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});