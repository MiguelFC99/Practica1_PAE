const Database = require("./database");



class User extends Database {
    constructor(){
        super();
        this.useCollection('users');
    }
}

module.exports = new User();