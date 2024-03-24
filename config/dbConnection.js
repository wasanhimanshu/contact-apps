const mongoose = require("mongoose")

const connectToDb = async () => {
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected",connect.connections.host,connect.connections.name)
    }catch(err){
        console.log(err)
        process.exit(1);
    }
};

module.exports = connectToDb