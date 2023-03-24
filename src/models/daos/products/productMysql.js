import ProductMySqlConteiner from "../../managers/mySql/productsMysql.managers.js"


class ProductMySqlDao extends ProductMySqlConteiner {
    constructor(options, tablename) {
        super(options, tablename)
    }
}

export { ProductMySqlDao } 