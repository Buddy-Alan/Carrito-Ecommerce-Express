import { config } from "../src/config/configDotenv.js";


export const validateRol = (req, res, next) => {
    if (config.rol == "ADMIN") return next() 
    return res.send({Message: "Rol no autorizado a acceder a esta ruta" })    
}