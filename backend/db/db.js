const mongoose = require("mongoose");

const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log("Connection Mongo: ON");
    } catch (error) {
        console.log("Error Connecting to Mongo:", error);
        throw new Error("Error Connectin to Mongo");
    }
}

module.exports = {dbConnection};