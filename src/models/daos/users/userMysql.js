import UserMySqlContainer from "../../managers/mySql/userMysql.managers.js"


class UserMySqlDao extends UserMySqlContainer {
    constructor(options, tablename) {
        super(options, tablename)
    }
}

export { UserMySqlDao } 