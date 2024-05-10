const express = require("express");
const { register, login } = require("../controllers/auth.js");
const auth = require("../models/auth.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

//router.get("/admin",vdsvffb)
//router.get("/product",auth,dvdvffdbgdngnynyh)

module.exports = router;
