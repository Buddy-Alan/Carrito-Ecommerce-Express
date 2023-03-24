import { logger } from "../../../../logger.js";

class ProductContainer {
    constructor(dataBase) {
        this.dataBase = dataBase;
    }

    createProduct = async (productoAAgregar) => {
        try {
            //Es un if que se usa para comprobar si existe el archivo
            const { title, price, thumbnail, descripcion, stock, codigo } = productoAAgregar
            if (title != undefined && price != undefined && thumbnail != undefined && descripcion != undefined && stock != undefined && codigo != undefined) {
                productoAAgregar = { timestamp: new Date(), title, price, thumbnail, descripcion, stock, codigo }
                const productoAgregado = await this.dataBase.insertMany({ timestamp: new Date(), title: title, price: price, thumbnail: thumbnail, descripcion: descripcion, stock: stock, codigo: codigo })
                return productoAgregado
            } else {
                return 1
                //El 1 lo retorna con el fin de hacer un filtro y detectar el error exacto
                //Si es 1 significa que completaron mal los datos
            }
        }
        catch (error) {
            logger.error(error)
            return 2
        }
    }

    getAll = async () => {
        try {
            const allProd = this.dataBase.find()
            return (allProd)
        } catch (error) {
            logger.error(error)
        }
    }

    getByID = async (id) => {
        try {
            const producID = await this.dataBase.find({ _id: id })
            return producID
        } catch (error) {
            logger.error(error)
            //Devuelve un 1, si no existe le ID
            return 1
        }
    }
    updateById = async (id, body) => {
        try {
            const { title, price, thumbnail, descripcion, stock, codigo } = body
            //Devuelve 1 para informar que el precio no es numerico
            if (isNaN(price) && price != undefined) return 1
            await this.dataBase.updateOne({ "_id": id }, { $set: { "title": title, "price": price, "thumbnail": thumbnail, "descripcion": descripcion, "stock": stock, "codigo": codigo } })
            const prodUpdate = await this.getByID(id)
            return prodUpdate
        } catch (err) {
            //Devuelve 2 para informar que el dato de id es erroneo
            logger.error(err)
            return 2
        }
    }

    deleteByID = async (id) => {
        try {
            const prodAEliminar = await this.getByID(id)
            //Al devolver 1, informa que el producto no existe
            if (prodAEliminar == "" || prodAEliminar == undefined) return 1
            await this.dataBase.deleteOne({ _id: id })
        } catch (error) {
            logger.error(error)
            //Al devolver 1, informa que el producto no existe
            return 1
        }
    }
}

export { ProductContainer }