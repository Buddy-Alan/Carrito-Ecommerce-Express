import { Router } from "express";
export const cartRout = Router();
import { validateToken } from "../../../middleware/validateToken.js";
import { validateRol } from "../../../middleware/validateRol.js";
import * as controller from "../../controllers/cart.controllers.js"


cartRout.get("/allCarts", validateRol, controller.getAllCart)

cartRout.get("/cart", validateToken, controller.getCartByUser)

cartRout.post("/cart/products", validateToken, controller.updateCarritoByUser)

cartRout.delete("/cart/products/:id", validateToken, controller.deleteProductByCart)



export default cartRout