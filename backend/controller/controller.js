const { users } = require('../models/model.js')
const { contact } = require('../models/contactModel.js')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const path = require("path");

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email already Exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const userDetails = await users.create({
            name,
            email,
            password: hashedPassword,
            role
        })
        res.status(200).json(userDetails)
    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid Credentials!" });
        }
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );
        res.status(200).json({ message: "Login Successfull!!!", token })
    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const getLoginPage = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../../frontend/html/auth.html'))
    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const getAdminPage = (req, res) => {
    try {
        res.status(200).sendFile(path.join(__dirname, "../../frontend/html/admin.html"))
    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }

}

const createContact = async (req, res) => {
    try {
        const { name, email, feedback } = req.body;
        const existingUser = await contact.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email already Exists" })
        }
        const contactDetails = await contact.create({
            name: name,
            email: email,
            feedback: feedback
        })
        res.status(200).json(contactDetails)
    }
    catch (e) {
        res.status(500).json({ message: e.message })
    }
}

module.exports = { register, login, getLoginPage, getAdminPage, createContact }