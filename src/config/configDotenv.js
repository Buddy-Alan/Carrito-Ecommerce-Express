import * as dotenv from "dotenv"

//Configuramos Dotenv
dotenv.config({
    path: ".env.production"
})

export const config = {
    BDEcommerce: process.env.DBMongo || "",
    claveSesion: process.env.Clave_Sesion,
    Modo: process.env.MODO,
    DB: process.env.DataBase,
    MySql: process.env.MySql,
    dbMysql: process.env.databaseMysql,
    passMysql: process.env.passwordMysql,
    userMysql: process.env.userMysql,
    hostMysql: process.env.hostMysql,
    portMysql: process.env.portMysql,
    rol: process.env.rol
}