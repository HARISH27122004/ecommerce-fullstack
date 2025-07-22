const express = require("express");
const router = express.Router();
const { register, login, getLoginPage, getAdminPage, createContact } = require('../controller/controller.js');
const { protect, adminOnly } = require("../middleware/auth.js");

router.post('/register', register)

router.post('/login', login)

router.get('/getloginpage', getLoginPage)

router.get("/me", protect, (req, res) => {
  res.status(200).json({ user: req.user });
});

router.get("/admin", protect, adminOnly, getAdminPage);

router.post("/contact", createContact)

module.exports = router; 