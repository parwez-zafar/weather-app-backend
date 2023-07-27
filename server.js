const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const PORT = process.env.PORT;
const connect_database = require('./DB/database');
connect_database();

// console.log(process.env.uri);

// Handeling uncaught error
process.on("uncaughtException", (err) => {
    console.log(`Error : &{err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
})



// console.log(process.env.uri);


const server = app.listen(PORT, () => {
    console.log(`server is working on http://localhost:${PORT}`);
})


// unhandled Promise Rejection
process.on("uncaughtExceptionMonitor", (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(() => {
        process.exit(1);
    })
})