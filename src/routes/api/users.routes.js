import { Router } from "express";
import * as controller from "../../controllers/login.controllers.js";
import { validateRol } from "../../../middleware/validateRol.js";
import { validateToken } from "../../../middleware/validateToken.js";
const user = Router()



user.get("/api/user/allUser", validateRol, controller.getAllUserController)

user.post("/api/user/create", controller.postUserPostmanController)

user.get("/api/user/:id", controller.findUserController)

user.post("/api/user/login", controller.loginUserControllers)

user.put("/api/user/update", validateToken, controller.updateUserControllers)


export default user
