import express from "express";
const router = express.Router()
import user from "./api/users.routes.js";
import productRouter from "./api/rutasProductos.routes.js"
import cartRout from "./api/carts.routes.js";
import home from "./api/home.routes.js";


router.use("/api", user);
router.use("/api", productRouter);
router.use("/api", cartRout)
router.use("/", home)

export { router as apiRouter }