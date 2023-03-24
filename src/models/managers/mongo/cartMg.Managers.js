import { logger } from "../../../../logger.js";
import { convertCartToDto } from "../../dto/cart.dto.js";

class CartContainer {
    constructor(dataBase) {
        this.dataBase = dataBase;
    }

    createCart = async (user) => {
        try {
            const carrito = await this.dataBase.insertMany({ timestamp: new Date(), email: user })
            return carrito
        } catch (error) {
            logger.error(error)
        }
    } //Fin del if de "Save"

    getAllCart = async () => {
        try {
            const carritos = await this.dataBase.find()
            return carritos
        } catch (error) {
            logger.error(error)
        }
    }

    getCartByID = async (idDelCarrito) => {
        //Ver porque no me da los carritos
        try {
            const carritos = await this.dataBase.find({ _id: idDelCarrito })
            return carritos
        } catch (error) {
            logger.error(error)
        }
    }



    //Actualizar update carrito by id
    //Ver si usar el delete CarritoByID

    deleteCarritoByID = async (idAEliminar) => {
        try {
            const carritoAEliminar = await this.getCarritoByID(idAEliminar)
            if (carritoAEliminar == undefined || carritoAEliminar == "") {
                return 1
            } else {
                await this.dataBase.deleteOne({ _id: idAEliminar })
                return carritoAEliminar
            }
        } catch (error) {
            logger.error(error)
        }
    }

    getCarrtByUser = async (user) => {
        try {
            const cart = await this.dataBase.find({ email: user })
            const cartDto = convertCartToDto(cart)
            return cartDto
        } catch (err) {
            logger.error(err)
        }
    }

    deleteProductByID = async (user, idProduct) => {
        try {
            const data = await this.getCarrtByUser(user)
            const cart = data[0]
            const products = cart.products
            const cartFilter = products.filter(prod => prod.id != idProduct)
            await this.dataBase.updateOne({ _id: cart.id }, { $set: { products: cartFilter } })
            const newCart = await this.getCarrtByUser(user)
            return newCart
        }
        catch (err) {
        }
    }

    updateCarritoByUser = async (user, product) => {
        try {
            const data = await this.getCarrtByUser(user)
            const cart = data[0]
            const findIndex = cart.products.findIndex(e => e.id === product.id)
            //Busca el producto, por ID, y si no lo encuentra, lo agrega a la base de datos
            if (findIndex === -1) {
                {
                    const newProduct = {
                        _id: product._id,
                        title: product.title,
                        price: product.price,
                        descripcion: product.descripcion,
                        stock: 1,
                        codigo: product.codigo
                    }
                    const newCart = await this.dataBase.updateOne({ _id: cart.id }, { $push: { products: { $each: [newProduct] } } })
                    return newCart
                }
            }
            cart.products[findIndex].stock += 1
            const newCart = await this.dataBase.updateOne({ _id: cart.id }, { $set: { products: cart.products } })
            return newCart
        } catch (error) {
            logger.error(error)
        }
    }
}


export default CartContainer