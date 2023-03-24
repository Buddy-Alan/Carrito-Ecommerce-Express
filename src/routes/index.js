import express from "express";
const router = express.Router()
import user from "./api/users.routes.js";
import productRouter from "./api/rutasProductos.routes.js"
import cartRout from "./api/carts.routes.js";


router.use("/", user);
router.use("/api", productRouter);
router.use("/api", cartRout)

export { router as apiRouter }