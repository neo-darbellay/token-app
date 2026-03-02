// ETML
// Auteur : bulle SecDevOps
// Date : 26.03.2024
// Description : point d'entrée pour démarrer le serveur node.js de l'exercice
//               "Authentification"
//
//

// Librairies et ressources

import express from "express";
import userRoute from "./routes/User.mjs";
import authRoute from "./routes/Auth.mjs";
import { generateSalt } from "./utils/generateSalt.mjs";
import path from "path";
import { fileURLToPath } from "url";

import cookieParser from "cookie-parser";

const app = express();

// Middleware pour la lecture des réponses formatées en json
app.use(express.json());

app.use(cookieParser());

// Les routes
app.use("/user", userRoute);
app.use("/auth", authRoute);

// Root route serving test.html
app.get("/", (req, res) => {
  res.sendFile(path.resolve("./send-request.html"));
});

// Démarrage du serveur
app.listen(8083, () => {
  console.log(
    "Séquence authentification, server running on http://localhost:8083/user",
  );
});
