import { connectDB } from "../../js/connectDB.js"
const { userDaoContainer } = connectDB

export const getAllUser = async () => {
    const dato = await userDaoContainer.getAll()
    return dato
}

export const postUserPostman = async (user) => {
    const resultado = await userDaoContainer.createUser(user)
    return resultado
}

export const findUserByID = async (id) => {
    const resultado = userDaoContainer.findUserByID(id)
    return resultado
}


export const logUser = async (email, pass) => {
    const respone = userDaoContainer.logUser(email, pass)
    return respone
}

export const updateUser = async (data, user) => {
    const userUpdate = await userDaoContainer.updateUser(data, user)
    return userUpdate
}