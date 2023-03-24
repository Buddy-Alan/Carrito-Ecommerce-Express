import { Router } from "express";
import * as controller from "../../controllers/login.controllers.js";
import { validateRol } from "../../../middleware/validateRol.js";
import { validateToken } from "../../../middleware/validateToken.js";
const user = Router()



user.get("/user/allUser", validateRol, controller.getAllUserController)

user.post("/user/create", controller.postUserPostmanController)

user.get("/user/:id", controller.findUserController)

user.post("/user/login", controller.loginUserControllers)

user.put("/user/update", validateToken, controller.updateUserControllers)


export default user
