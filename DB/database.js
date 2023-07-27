const mongoose = require('mongoose');

// console.log(process.env.uri);
const connect_database = () => {
    mongoose.connect(process.env.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    }).then((data) => {
        console.log(`DataBase connected with ${data.connection.host}`);
    })
}

module.exports = connect_database;