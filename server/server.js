
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const logger = require("./logger.js");
const router = require("./router/route.js");

// const morgan = require('morgan');
require('dotenv').config({ path:'./.env' })
// const User = require("./user.model.js");


app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: "100mb" }))
app.disable('x-powered-by')
// app.use(morgan('tiny'));

const port = process.env.PORT || 5000;
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        console.log("Connection complete")
    }).catch((error) => {
        console.log(error.message);
        console.log(error.message || "Connection Failed");
        logger.logger.log("error", error.message);
    })

app.get('/', (req, res) => {
    res.status(200).json("Hello There")
})

app.use('/api', router);

app.use((err, req, res, next)=> {
    return res.status(500).json("Hello error from handler")
 })

app.listen(port, () => console.log("Node is listening to " + port));
