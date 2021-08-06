const express = require('express');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const router = express.Router();
const User = require('../models/user.model.js')

router.get('/currentUser', (req, res) => {
    let token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, config.secret);
    User.findById(decoded.id)
        .then((data) => {
            res.json(data)
        })
        .catch((error) => {
            console.log('error', error)
        })
})

module.exports = router;
