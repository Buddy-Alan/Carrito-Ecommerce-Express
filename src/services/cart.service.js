import { connectDB } from "../../js/connectDB.js";
const { cartDaoContainer } = connectDB

export const createCart = async (user) => {
    const cart = await cartDaoContainer.createCart(user)
    return cart
}

export const getCartByUser = async (user) => {
    const cart = await cartDaoContainer.getCarrtByUser(user)
    return cart

}
export const updateCartByUser = async (user, product) => {
    await cartDaoContainer.updateCarritoByUser(user, product)
}


export const getAllCart = async () => {
    const carts = await cartDaoContainer.getAllCart()
    return carts
}

export const deleteProductByID = async (user, idProduct) => {
    const newCart = await cartDaoContainer.deleteProductByID(user, idProduct)
    return newCart
}