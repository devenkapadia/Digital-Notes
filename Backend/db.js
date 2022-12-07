const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/inotebook'


const connectMongoDB = () => {
    mongoose.connect(url, () => {
        console.log("db-connection Successful");
    })
}

module.exports = connectMongoDB;