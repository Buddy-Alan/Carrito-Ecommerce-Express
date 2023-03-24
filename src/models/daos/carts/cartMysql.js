import CartMySqlContainer from "../../managers/mySql/cartMysql.Managers.js"


class CartMySqlDao extends CartMySqlContainer {
    constructor(options, tablename) {
        super(options, tablename)
    }
}

export { CartMySqlDao } 