import knex from "knex";
import { logger } from "../../../../logger.js";
import { convertProductToDto } from "../../dto/products.dto.js";

class ProductMySqlConteiner {
    constructor(options, tableName) {
        this.database = knex(options)
        this.tableName = tableName
    }

    createProduct = async (product) => {
        try {
            const { title, price, thumbnail, descripcion, stock, codigo } = product
            //Se hace un filtro, retorna 1 si se completo mal un dato
            if (title === undefined || price === undefined || thumbnail === undefined || descripcion === undefined || stock === undefined || codigo === undefined) return 1
            product = { timestamp: new Date(), title, price, thumbnail, descripcion, stock, codigo }
            const exist = await this.database.from(this.tableName).where("title", title)
            //Se hace un filtro, retorna 2 si el producto es duplicado
            if (exist != "") return 2
            const idNewProduct = await this.database.from(this.tableName).insert(product)
            const id = idNewProduct[0]
            const newProduct = await this.database.from(this.tableName).select("*").where("id", id)
            return newProduct
            //El 1 lo retorna con el fin de hacer un filtro y detectar el error exacto
            //Si es 1 significa que completaron mal los datos
        }
        catch (error) {
            logger.error(error)
        }
    } //Aca termina la funcion Save()

    getAll = async () => {
        try {

            const allProd = await this.database.from(this.tableName).select("*")
            const productDto = convertProductToDto(allProd)
            return productDto
        } catch (error) {
            logger.error(error)
        }
    }

    getByID = async (id) => {
        //Ver si funciona el get by id
        //Hay que cambiar el if seguro porque si me devuelve vacio
        try {
            const idProduct = parseInt(id)
            const producID = await this.database.from(this.tableName).select("*").where("id", idProduct)
            //Devuelve un 1, si no existe le ID
            if (producID == "") return 1
            return producID
        } catch (error) {
            logger.error(error)
        }
    }
    updateById = async (id, data) => {
        try {
            const { price } = data
            //Devuelve 1 para informar que el precio no es numerico
            if (isNaN(price) && price != undefined) return 1
            const idProductUpdate = await this.database.from(this.tableName).update(data).where("id", id)
            //Devuelve un 2 si el producto no existe
            if (idProductUpdate === 0) return 2
            const product = await this.getByID(idProductUpdate)

            return product
        } catch (err) {
            //Devuelve 2 para informar que el dato de id es erroneo
            logger.error(err)
        }
    }

    deleteByID = async (id) => {
        try {
            const data = await this.database.from(this.tableName).delete("id", id)
            //Al devolver 1, informa que el producto no existe
            if (data === 0) return 1
        } catch (error) {
            logger.error(error)
        }
    }

}

export default ProductMySqlConteiner
