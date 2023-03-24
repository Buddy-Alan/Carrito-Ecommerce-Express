import knex from "knex";
import { compareHash, createHash } from "../../../../bcrypt/createHash.js";
import { convertToDto } from "../../dto/user.dto.js";
import { generateToken } from "../../../../js/generateToken.js";
import { logger } from "../../../../logger.js";
import { validateEmail } from "../../../../js/validateMail.js";

class UserMySqlContainer {
    constructor(options, tableName) {
        this.database = knex(options)
        this.tableName = tableName
    }

    createUser = async (user) => {
        try {
            if (!validateEmail(user.email)) return { "messages:": "Por favor, ingrese un mail valido" }
            const idUser = await this.database.from(this.tableName).insert(user)
            const usuario = await this.database.from(this.tableName).select("*").where("id", idUser[0])
            const usersDto = convertToDto(usuario)
            return {
                "messages:": "Se creo el usuario",
                "usuario:": usersDto
            }
        } catch (error) {
            logger.error(error)
            return ({ message: "El usuario ya existe, por favor intente con otro email" })
        }
    }


    getAll = async () => {
        try {
            const usuarios = await this.database.from(this.tableName).select("*")
            const usersDto = convertToDto(usuarios)
            return usersDto
        } catch (error) {
            logger.error(error)
        }
    }


    findUserByID = async (id) => {
        try {
            const response = await this.database.from(this.tableName).select("*").where("id", id)
            const usersDto = convertToDto(response)
            return {
                "messages:": "El usuario solicitado es: ",
                "usuario:": usersDto
            }
        }
        catch (err) {
            logger.error(err)
        }
    }

    logUser = async (email, pass) => {
        try {
            const emailUser = email
            const userFind = await this.database.from(this.tableName).select("*").where("email", emailUser)
            //Devuelve un 1 para informar que el usuario no existe
            if (userFind == "") return 1
            const respone = compareHash(pass, userFind[0].password)
            if (respone == false) return 2
            const accesToken = generateToken(email)
            return accesToken
            //Devuelve un 2 si la contraseña es erronea
        } catch (err) {
            logger.error(err)
        }
    }
    updateUser = async (data, user) => {
        try {
            if (data.email) return 2
            const idUserUpdate = await this.database.from(this.tableName).update(data).where("email", user)
            const response = await this.database.from(this.tableName).select("*").where("id", idUserUpdate)
            const userDto = convertToDto(response)
            return userDto
        }
        catch (err) {
            logger.error(err)
        }
    }
}

export default UserMySqlContainer
