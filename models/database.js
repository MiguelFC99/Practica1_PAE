const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');

dotenv.config();

const mongoUrl = process.env.MONGO_URL;

let db;
let isConnecting;


class Database{

    collectionName;

    constructor(){

        if (isConnecting) return;

        isConnecting = true;

        MongoClient.connect(mongoUrl,{useUnifiedTopology: true},(err, client)=>{
            if(err){
                console.log('Failed to connect to MongoDB');
                return;
            }
            db = client.db();
            console.log('Successfully connected to MongoDB')
        
            const collection = db.collection('users');
        
            collection.find({}).toArray((err,results)=>{
                if(err){
                    console.log('Could not retrieve users', err)
                    return;
                }
                console.log('Users: ', results);
            })
        });
    }

    useCollection(name){
        this.collectionName = name;
    }

    find(filters,cb){
        const collection = db.collection(this.collectionName);
        return collection.find(filters).toArray(cb);
    }
    insertOne(filters,cb){
        const collection = db.collection(this.collectionName);
        return collection.insertOne(filters).toArray(cb);
    }

}

module.exports = Database;