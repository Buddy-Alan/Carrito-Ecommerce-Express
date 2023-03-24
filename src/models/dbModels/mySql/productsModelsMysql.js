import { logger } from "../../../../logger.js";
const nameTableProducts = "products"

//ARREGLAR EL NAMETABLE o modificarla

const createTableProducts = async (dbSchema) => {
    try {
        const tablaExist = await dbSchema.hasTable(nameTableProducts);
        if (!tablaExist) {
            await dbSchema.createTable(nameTableProducts, table => {
                table.increments("id").unique(true),
                    table.string("timestamp", 150).notNullable(true),
                    table.string("title", 100).nullable(false).unique(true),
                    table.integer("price", 5),
                    table.string("thumbnail", 250).nullable(false),
                    table.string("descripcion", 250).nullable(false),
                    table.integer("stock", 5).nullable(false),
                    table.string("codigo", 20).nullable(false)
                logger.info("Tabla Products creada correctamente")
            })//CREA LA TABALA Productos
        } else {
            logger.info("Tabla Productos ya creda anteriormente")
        }
    } catch (error) {
        logger.error(error)
    }
}
export { createTableProducts, nameTableProducts }