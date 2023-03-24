import { getApiDato } from "../src/models/index.models.js";
import { config } from "../src/config/configDotenv.js";

export const connectDB= await getApiDato(config.DB)