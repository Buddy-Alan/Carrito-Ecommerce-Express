
import { convertToDto } from "../../dto/user.dto.js";
import { compareHash } from "../../../../bcrypt/createHash.js";
import { generateToken } from "../../../../js/generateToken.js";
import { logger } from "../../../../logger.js";
import { validateEmail } from "../../../../js/validateMail.js";
class UserContainer {
    constructor(dataBase) {
        this.dataBase = dataBase;
    }

    // Solicitad todos los usuarios en la BASE de DAtos
    // No hace una comparacion del hash ()
    getAll = async () => {
        try {
            const response = await this.dataBase.find()
            const newData = JSON.parse(JSON.stringify(response))
            const usersDto = convertToDto(newData)
            return usersDto
        } catch (err) {
            logger.error(err)
        }
    }
    //Crea un usuario de la manera antigua (Aca crea el usuario pero no le hashea)
    createUser = async (user) => {
        try {
            if (!validateEmail(user.email)) return ({ "messages:": "Por favor, ingrese un mail valido" })
            const dato = await this.dataBase.findOne({ email: user.email })
            if (dato != null && dato != "") return ({ message: "El usuario ya existe, por favor intente con otro email" })
            const response = await this.dataBase.create(user)
            const newData = JSON.parse(JSON.stringify(response))
            const usersDto = convertToDto(newData)
            return {
                "messages:": "Se creo el usuario",
                "usuario:": usersDto
            }
        } catch (error) {
            logger.error(error)
        }
    }

    findUserByID = async (id) => {
        try {
            const response = await this.dataBase.findOne({ _id: id })
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
            const userFind = await this.dataBase.findOne({ email: email })
            const respone = compareHash(pass, userFind.password)
            if (respone) {
                const accesToken = generateToken(email)
                return accesToken
            }
        } catch (err) {
            logger.error(err)
        }
    }

    updateUser = async (data, user) => {
        try {
            //SE hace un filtro en el email, para que no lo puedan actualizar
            if (!!data.email) return 2
            const { name, lastname, edad, password } = data
            await this.dataBase.updateOne({ "email": user }, { $set: { "name": name, "lastname": lastname, "edad": edad, "password": password } })
            const response = await this.dataBase.find({ "email": user })
            const userDto = convertToDto(response)
            return userDto
        }
        catch (err) {
            logger.error(err)
        }
    }
}

export { UserContainer }
