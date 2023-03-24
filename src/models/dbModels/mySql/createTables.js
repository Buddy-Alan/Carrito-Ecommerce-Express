
import knex from "knex";
import { logger } from "../../../../logger.js";
import { createTableCart, nameTableCart } from "./cartModelsMysql.js";
import { createTableProdInCart, nameTableProdInCart } from "./prodInCarttModelsMysql.js";
import { createTableProducts, nameTableProducts } from "./productsModelsMysql.js";
import { createTableUser, nameTableUser } from "./userModelsMysql.js";

//ARREGLAR EL NAMETABLE o modificarla

const createTable = async (conexion) => {

    try {
        const dbMysqlConnect = knex(conexion)
        await createTableProducts(dbMysqlConnect.schema)
        await createTableCart(dbMysqlConnect.schema)
        await createTableProdInCart(dbMysqlConnect.schema)
        await createTableUser(dbMysqlConnect.schema)
        dbMysqlConnect.destroy();
    } catch (error) {
        logger.error(error)
    }
}
export { createTable, nameTableUser, nameTableCart, nameTableProducts }