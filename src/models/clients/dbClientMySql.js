
import { config } from "../../config/configDotenv.js"
import { logger } from "../../../logger.js";
import * as mysql from "mysql";




const mysqlConect = mysql.createConnection({
    host: config.hostMysql,
    port: config.portMysql,
    user: config.userMysql,
    password: config.passMysql,
    database: config.dbMysql
})

class MySqlClient {
    constructor() {
        this.client = mysqlConect
    }

    async connectDB() {
        try {
            const conexion = await this.client.connect()
            logger.info("¡Conexion a MySql Exitosa!")
        }
        catch (err) {
            logger.warn(err)
            throw new Error(`Conexion fallida ${err}`);
        }
    }
}

export { MySqlClient, mysqlConect }