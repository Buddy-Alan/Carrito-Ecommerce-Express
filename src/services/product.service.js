import { connectDB } from "../../js/connectDB.js";
const { productDaoContainer } = connectDB
export const getAllProducts = async () => {
    const products = await productDaoContainer.getAll()
    return products
}
export const createProduct = async (product) => {
    const products = await productDaoContainer.createProduct(product)
    return products
}
export const findProductBydID = async (id) => {
    const products = await productDaoContainer.getByID(id)
    return products
}
export const updateProductByID = async (id, data) => {
    const products = await productDaoContainer.updateById(id, data)
    return products
}
export const deleteProductByID = async (id) => {
    const products = await productDaoContainer.deleteByID(id)
    return products
}