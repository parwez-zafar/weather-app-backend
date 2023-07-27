const express = require('express');
const errorMiddleware = require('./middleware/error')
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cookieParser());

const user = require('./routes/userRoute');
app.use('/api/v1', user);

app.use(errorMiddleware);

module.exports = app;
