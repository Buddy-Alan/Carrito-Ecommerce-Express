import * as service from "../services/user.service.js"
import { createHash } from "../../bcrypt/createHash.js"
import { createCart } from "../services/cart.service.js"
import { logger } from "../../logger.js"


export const getAllUserController = async (req, res) => {
    try {
        const allUser = await service.getAllUser()
        res.json({ usuarios: allUser })
    } catch (err) {
        logger.error(err)
    }
}

export const postUserPostmanController = async (req, res) => {
    const { name, lastname, email, password, edad } = req.body
    const newUser = {
        "name": name,
        "lastname": lastname,
        "edad": edad,
        "email": email,
        "password": createHash(password)
    }
    const usuario = await service.postUserPostman(newUser)
    await createCart(email)
    //Hacer filstros con numeros
    res.json(usuario)
}



export const findUserController = async (req, res) => {
    const { id } = req.params
    const usuario = await service.findUserByID(id)
    res.json({ usuario })
}

export const loginUserControllers = async (req, res) => {
    const { email, password } = req.body
    const data = await service.logUser(email, password)
    if (data == 1 || data == 2) return res.json({ message: "Usuario y/o contraseña incorrectos" })
    res.header('authorization', data).json({
        message: "Correcto inicio ",
        token: data
    })
}

export const updateUserControllers = async (req, res) => {
    const user = req.user
    const updateUser = req.body
    const dato = await service.updateUser(updateUser, user)
    if (dato == 1) return res.json({ message: "Ingrese correctamente los datos" })
    if (dato == 2) return res.json({ "message:": "Momentaneamente los email no se pueden actualizar" })
    res.json({
        "Message:": "Usuario Actualizado con exito",
        "User": dato
    })
}

