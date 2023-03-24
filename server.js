import express from "express";
import { config } from "./src/config/configDotenv.js"
import { logger } from "./logger.js";
import { apiRouter } from "./src/routes/index.js";

const puerto = process.env.PORT || 8080;
const app = express();

app.listen(puerto, () => {
    logger.info(`server on port ${puerto} en el modo, ${config.Modo}, en el proceso ${process.pid}`)
})


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Rutas
app.use("/", apiRouter)
app.get("*", (req, res) => {
    logger.warn(`Se intento ingresar al a ruta ${req.path}`)
})


