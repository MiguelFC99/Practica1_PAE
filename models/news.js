const Database = require("./database");



class News extends Database{
    constructor(){
        super();
        this.useCollection('news');
    }
}

module.exports = new News();