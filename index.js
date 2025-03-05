const express = require("express");
const PORT = 7700;
const mongoose = require("mongoose")
const path = require("path");
const Contact = require("./models/details");


const app = express();

app.use(express.static(path.join(__dirname, 'project4')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'project4', 'index.html'))
});

app.post('/post', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const contact = new Contact({
            name,
            email,
            message,
        })
        await contact.save()
        console.log("Data Saved:", contact);
        res.send('Form Submission Successfull!!!');
    }
    catch (e) {
        console.log("Error:", e)
        res.status(500).json({ message: e.message });
    }
})

mongoose.connect("mongodb://localhost:27017/college")
    .then(() => {
        console.log("successfully connected");

        app.listen(PORT, () => {
            console.log(`server is running on PORT : ${PORT}`);
        });
    })

    .catch(() => {
        console.log("cannot connect to the db");
    })






