import { logger } from "../../../../logger.js";
const nameTableUser = "user";

//ARREGLAR EL NAMETABLE o modificarla

const createTableUser = async (dbSchema) => {

    try {
        const tablaUserExist = await dbSchema.hasTable(nameTableUser)
        if (!tablaUserExist) {
            await dbSchema.createTable(nameTableUser, table => {
                table.increments("id").unique(true),
                    table.string("name", 150).nullable(false),
                    table.string("lastname", 150).nullable(false),
                    table.integer("edad", 5),
                    table.string("email", 150).nullable(false).unique(true),
                    table.string("password", 550).nullable(false)
                logger.info("Tabla User creada correctamente")
            })//CREA LA TABALA USUARIOS
        } else {
            logger.info("Tabla user ya creda anteriormente")
        }
    } catch (error) {
        logger.error(error)
    }
}
export { nameTableUser, createTableUser }