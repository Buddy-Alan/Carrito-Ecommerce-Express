import knex from "knex";
import { logger } from "../../../../logger.js";
import { convertCartToDto } from "../../dto/cart.dto.js";

class CartMySqlContainer {
    constructor(options, tableName) {
        this.database = knex(options)
        this.tableName = tableName
    }

    createCart = async (user) => {
        try {
            await this.database.from(this.tableName).insert({ timestamp: new Date(), "email": user })
        } catch (error) {
            logger.error(error)
        }
    } //Fin del if de "Save"

    getCarrtByUser = async (user) => {
        try {
            const cart = await this.database.select("cart.id", "prod_in_cart.id_cart", "prod_in_cart.id_product", "prod_in_cart.stock").from("cart").leftJoin("prod_in_cart", "cart.id", "prod_in_cart.id_cart").where("email", user)
            if (cart[0].id_cart == null) return ({ id: cart[0].id, user: user, products: [] })
            let product = []
            for (let i = 0; i < cart.length; i++) {
                const idABuscar = cart[i].id_product
                let newProd = await this.database.select("title", "price", "descripcion").from("products").where("id", idABuscar)
                const productInCart = { ...newProd[0], ... { "stock": cart[i].stock } }
                //Ver de hacer el un filtro para traer los productos, y despues mostrar el carrito
                product.push(productInCart)
            }
            const cartByUser = {
                id: cart[0].id,
                email: user,
                "products": product
            }
            return cartByUser
        } catch (err) {
            logger.error(err)
        }
    }

    updateCarritoByUser = async (email, product) => {
        try {
            const cart = await this.database.select("cart.id", "prod_in_cart.id_cart", "prod_in_cart.id_product", "prod_in_cart.stock").from("cart").leftJoin("prod_in_cart", "cart.id", "prod_in_cart.id_cart").where("email", email)
            const findIndex = cart.findIndex(e => e.id_product == product.id)
            if (cart[0].id_cart == null || findIndex == -1) {
                const newProduct = {
                    "id_cart": cart[0].id,
                    "id_product": product.id,
                    "stock": 1
                }
                await this.database.insert(newProduct).from("prod_in_cart")
            }
            else {
                const newStock = cart[findIndex].stock += 1
                await this.database.update("stock", newStock).from("prod_in_cart").where("id_cart", cart[0].id).andWhere("id_product", product.id)
            }
        } catch (error) {
            logger.error(error)
        }
    }

    deleteProductByID = async (user, idProduct) => {
        try {
            const cart = await this.getCarrtByUser(user)
            const data = await this.database("prod_in_Cart").delete().where("id_cart", cart.id).andWhere("id_product", idProduct)
            if (data == 0) return 1
            const newCart = await this.getCarrtByUser(user)
            return newCart
        }
        catch (err) {
            logger.error(err)
        }
    }

    getAllCart = async () => {
        try {
            const dato = await this.database.select("email").from(this.tableName)
            let allCart = []
            for (let i = 0; i < dato.length; i++) {
                const cart = await this.getCarrtByUser(dato[i].email)
                allCart.push(cart)
            }
            return allCart
        } catch (error) {
            logger.error(error)
        }
    }

}


export default CartMySqlContainer