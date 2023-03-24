import * as service from "../services/cart.service.js"
import { findProductBydID, updateProductByID } from "../services/product.service.js"
import { logger } from "../../logger.js"
import { convertCartToDto } from "../models/dto/cart.dto.js"


export const getCartByUser = async (req, res) => {
    try {
        const user = req.user
        const carrito = await service.getCartByUser(user)
        res.json({
            Message: carrito
        })
    }
    catch (error) {
        logger.error(error)
    }
}


export const updateCarritoByUser = async (req, res) => {
    const idProduct = (req.body.id)
    const user = (req.user)
    try {
        const productByID = await findProductBydID(idProduct)
        if (productByID == "" || productByID == 1) return res.json({ "message": "Producto no existente" })
        const product = productByID[0]
        if (product.stock === 0) return res.json({ "message": `No hay suficiente stock del producto de id: ${product.id}` })
        await service.updateCartByUser(user, product)
        const cart = await service.getCartByUser(user)
        product.stock -= 1
        updateProductByID(idProduct, product)
        res.json({
            "Message:": "¡Carrito Actualizado con exito!",
            "Cart": cart
        })
    } catch (error) {
        logger.error(error)
    }
}


export const deleteProductByCart = async (req, res) => {
    const { id } = req.params
    const user = req.user
    try {
        const newCard = await service.deleteProductByID(user, id)
        if (newCard == 1) return res.json({ "Message:": "¡El producto no existe en el carrito!" })
        if (newCard.products == "") return res.json({ "Message:": "¡Producto Borrado con exito! Su carrito  quedo vacio" })
        const cartDto = convertCartToDto(newCard)
        res.json({
            "Message:": "¡Producto Borrado con exito!",
            "Cart": cartDto
        })
    } catch (error) {
        logger.error(error)
    }
}


export const getAllCart = async (req, res) => {
    try {
        const carts = await service.getAllCart()
        res.json({
            "All Carts": carts
        })
    } catch (error) {
        logger.error(error)
    }
}

//Ver si lo hago (no es muy relevante)
export const getProductByCart = async (req, res) => {
    const idSolicitado = (req.params.id)
    try {
        const carritoByID = await carritoProductos.getCarritoByID(idSolicitado)
        if (carritoByID[0].userName == req.user.userName) {
            switch (carritoByID) {
                case 1:
                    res.json({
                        message: `El Carrito con id ${idSolicitado} no existe`
                    });
                    break;
                case undefined:
                    res.json({
                        message: `El Carrito con id ${idSolicitado} no existe`
                    });
                    break;
                case 2:
                    res.json({
                        message: `Actualmente no existe ningun carrito creado`
                    });
                    break;
                default:
                    //Se ustiliza la funcion Array.isArray() Con el objetivo de que me devuelva un valor de verdad
                    //Para poder comprar si trabajmos con un objeto o con un array
                    const esArray = Array.isArray(carritoByID)
                    if (esArray) {
                        const productosCarrito = carritoByID[0].productos
                        res.json({
                            message: `El carrito ${idSolicitado} tiene los productos:`,
                            productos: productosCarrito
                        })
                    } else {
                        res.json({
                            message: `El carrito ${idSolicitado} tiene los productos:`,
                            productos: carritoByID.productos
                        })
                    }
            }
        }
        else {
            res.json({ messages: `Su usuario ${req.user.userName}, no posee acceso a este carrito de compras` })
        }
    } catch (error) {
        logger.error(error)
    }
}
