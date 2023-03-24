import { Router } from "express"
import * as controllers from "../../controllers/product.controllers.js"


const productRouter = Router()

productRouter.get("/products", controllers.getAllProductsControllers)

productRouter.get("/products/:id", controllers.getProductByIDControllers)

productRouter.delete("/products/:id", controllers.deleteProductByIDControllers)

productRouter.post("/products", controllers.createProductControllers)

productRouter.put("/products/:id", controllers.updateProductByIDContreollers)



export default productRouter