import { ProductContainer } from "../../managers/mongo/productMg.Managers.js";

class ProductMgDao extends ProductContainer {
    constructor(model) {
        super(model)
    }
}
export { ProductMgDao }