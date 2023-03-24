import * as service from "../services/product.service.js"
import { logger } from "../../logger.js"
//Pasar el dto al manager
import { convertProductToDto } from "../models/dto/products.dto.js"
export const getAllProductsControllers = async (req, res) => {
    try {
        const productosAMostrar = await service.getAllProducts()
        if (productosAMostrar == "" || productosAMostrar == 1) {
            res.json({
                message: "El archivo esta vacio"
            })
        } else if (productosAMostrar == 2) {
            res.json({
                message: "El archivo no existe"
            })
        } else {
            res.json(productosAMostrar)
        }
    } catch (error) {
        res.status(500).send("Hubo un error en el Servidor")
    }
}

export const createProductControllers = async (req, res) => {
    const newProduct = req.body;
    try {
        //Hacer un dto de productos
        const productoAAgregar = await service.createProduct(newProduct)
        if (productoAAgregar == 1) {
            res.json({
                message: "No se completaron los datos de manera correcta"
            })
        } else if (productoAAgregar == 2) {
            res.json({
                message: `El producto con  titulo ${newProduct.title}, ya existe, por favor no repita productos`
            })
        }
        else {
            const productsDto = convertProductToDto(productoAAgregar)
            res.json({
                message: "Producto Agregado con exito!",
                product: productsDto
            })
        }
    } catch (error) {
        logger.error(error)
        res.status(500).send("Hubo un error en el Servidor")
    }
}

export const getProductByIDControllers = async (req, res) => {
    const id = req.params.id
    try {
        const productoSolicutado = await service.findProductBydID(id)
        if (productoSolicutado == 1) return res.status(400).json({ message: "El producto solicitado no existe" })
        const productoDto = convertProductToDto(productoSolicutado)
        res.json({ Product: productoDto })
    } catch (error) {
        logger.error(`Hubo un error en la peticion del producto de la ruta ${req.path}, el error es: ${error}`)
    }
}

export const deleteProductByIDControllers = async (req, res) => {
    try {
        const id = req.params.id
        const product = await service.deleteProductByID(id)
        if (product === 1 || product === "") return res.json({ message: "El producto a eliminar no existe" })
        res.json({ message: `Se elimino el producto de id: ${id}` })
    } catch (error) {
        logger.error(`Hubo un error intentado borrar el producto de la ruta ${req.path}, el error es: ${error}`)
    }
}


export const updateProductByIDContreollers = async (req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        if (Object.keys(data).length === 0) return res.json({ message: "Ingrese correctamente los datos para intentar actualizar" })
        const dataUpdate = await service.updateProductByID(id, data)
        //Si al actualizar devuelve un 1 significa que el precio no es numerico
        if (dataUpdate === 1) return res.json({ message: "El precio ingreado no es numerico" })
        //Si al actualizar devuelve un 2 significa que el id de producto no es valido
        if (dataUpdate === 2) return res.json({ message: "ID de producto erroneo" })
        res.json({
            message: "El producto fue actualizado con exito",
            product: dataUpdate
        })
    } catch (error) {
        logger.error(`Hubo un error intentado actualizar el producto de la ruta ${req.path}, el error es: ${error}`)
    }
}