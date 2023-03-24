import mongoose from "mongoose";
import { logger } from "../../../logger.js";
import { config } from "../../config/configDotenv.js";


class MongoClient {
    constructor() {
        this.client = mongoose
    }

    async connect() {
        try {
            await this.client.connect(config.BDEcommerce)
            logger.info("¡Conexion a Mongo Exitosa!")
        }
        catch (err) {
            logger.warn(err)
            throw new Error(`Conexion fallida ${err}`);
        }
    }

    async disconnect() {
        try {
            await this.client.connection.close()
            logger.info("¡Conexion Finalizada!")
        }
        catch (err) {
            logger.warn(err)
            throw new Error(`Conexion fallida ${err}`);
        }
    }
}

export { MongoClient }

