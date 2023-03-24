import { UserContainer } from "../../managers/mongo/userMg.managers.js"

class UserMgDao extends UserContainer {
    constructor(model) {
        super(model)
    }
}

export { UserMgDao } 