const express = require("express");
const mongoose = require("mongoose")
const app = express();
const cors = require("cors")
require("dotenv").config();
const PORT = process.env.PORT || 7700
const router = require('./routes/route.js')
const path = require('path')

app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../frontend')))

app.use('/api', router)

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("successfully connected");

        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        });
    })
    .catch(() => {
        console.error("cannot connect to the db");
    })






