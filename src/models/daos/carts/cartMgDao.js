import CartContainer from "../../managers/mongo/cartMg.Managers.js"

class CartMgDao extends CartContainer {
    constructor(model) {
        super(model)
    }
}
export { CartMgDao }