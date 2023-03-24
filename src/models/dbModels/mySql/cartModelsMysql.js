import { logger } from "../../../../logger.js";
const nameTableCart = "cart"

//ARREGLAR EL NAMETABLE o modificarla

const createTableCart = async (dbSchema) => {
    try {
        const tablaExist = await dbSchema.hasTable(nameTableCart);
        if (!tablaExist) {
            await dbSchema.createTable(nameTableCart, table => {
                table.increments("id").unique(true).nullable(false),
                    table.dateTime("timestamp", 6).nullable(false),
                    table.string("email", 150).nullable(false),
                    logger.info("Tabla Cart creada correctamente")
            })//CREA LA TABALA USUARIOS
        }
        else {
            logger.info("Tabla Cart ya creda anteriormente")
        }
    } catch (error) {
        logger.error(error)
    }
}
export { createTableCart, nameTableCart }