require("dotenv").config();
const express = require('express');
const mongodb = require('./utils/mongodb');
const { errors, errorHandler, errorPath } = require('./middlewares/errorHandler')
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use("/", require('./routes/userRoute'));
app.use("/", require('./routes/productRoute'));
app.use("/", require('./routes/loginRoute'));
app.use("/", require('./routes/carRoute'));
app.use(errors);
app.use(errorHandler);
app.use(errorPath);

const start = async () => {
    try {
        await mongodb;
        console.log("Connected MongoDB");

        app.listen(PORT, () => {

            console.log(`SERVER LISTENING ON PORT ${PORT}`)
        });

    } catch (error) {
        console.error(error);
        process.exit(1); //codigo de error diferente de 0
    }
}

start();

