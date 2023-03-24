import { userModels } from "./dbModels/mongo/userModels.js";
import { productModels } from "./dbModels/mongo/productModels.js"
import { cartModels } from "./dbModels/mongo/cartModels.js";
import { MongoClient } from "./clients/dbClientMongo.js";
import { createTable, nameTableProducts, nameTableUser, nameTableCart } from "./dbModels/mySql/createTables.js"
import { logger } from "../../logger.js";
import { config } from "../config/configDotenv.js";

const conexion = {
    client: 'mysql',
    connection: {
        host: config.hostMysql,
        port: config.portMysql,
        user: config.userMysql,
        password: config.passMysql,
        database: config.dbMysql
    }
}
//ARREGLAR EL NAMETABLE o modificarla

export const getApiDato = async (DB) => {
    let userDaoContainer;
    let productDaoContainer;
    let cartDaoContainer;
    switch (DB) {
        case 'MYSQL':
            const { UserMySqlDao } = await import("./daos/users/userMysql.js")
            const { ProductMySqlDao } = await import("./daos/products/productMysql.js")
            const { CartMySqlDao } = await import("./daos/carts/cartMysql.js")
            //Si funciona conecta ala BD mysql
            await createTable(conexion)
            userDaoContainer = new UserMySqlDao(conexion, nameTableUser)
            productDaoContainer = new ProductMySqlDao(conexion, nameTableProducts)
            cartDaoContainer = new CartMySqlDao(conexion, nameTableCart)
            break;
        case 'MONGO':
            const { UserMgDao } = await import("./daos/users/userMgDao.js")
            const { ProductMgDao } = await import("./daos/products/productMgDao.js")
            const { CartMgDao } = await import("./daos/carts/cartMgDao.js")
            const cliente = new MongoClient();
            await cliente.connect()
            userDaoContainer = new UserMgDao(userModels)
            productDaoContainer = new ProductMgDao(productModels)
            cartDaoContainer = new CartMgDao(cartModels)
            break;
        default:
            logger.error("Ocurrio un error")
            break
    }
    return { userDaoContainer, productDaoContainer, cartDaoContainer }
}
