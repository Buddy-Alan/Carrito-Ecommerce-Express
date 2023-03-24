import { logger } from "../../../../logger.js";
const nameTableProdInCart = "prod_in_cart"


const createTableProdInCart = async (dbSchema) => {

    try {
        const tablaExist = await dbSchema.hasTable(nameTableProdInCart);
        if (!tablaExist) {
            await dbSchema.createTable(nameTableProdInCart, table => {
                table.increments("id").unique(true).nullable(false),
                    table.string("id_cart", 5).nullable(false),
                    table.string("id_product", 150).nullable(false),
                    table.integer("stock", 5).nullable(false)
                logger.info("Tabla prod_in_cart Creada Corretamente")
            })//CREA LA TABALA PRODUCT_IN_CART
        } else {
            logger.info("Tabla prod_in_cart  ya creda anteriormente")
        }
    } catch (error) {
        logger.error(error)
    }
}
export { createTableProdInCart, nameTableProdInCart }