const express = require('express');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const router = express.Router();
const User = require('../models/user.model.js')
const fetch = require('isomorphic-fetch');

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
const RSS_URL = `http://feeds.bbci.co.uk/news/rss.xml`
router.get('/news', (req, res) => {
    fetch(RSS_URL)
    .then(response => response.text())
    .then(data => res.send(data))
    
})

const SPORT_URL = `http://www.football-data.co.uk/mmz4281/1718/I1.csv`
router.get('/sport', (req, res) => {
    fetch(SPORT_URL)
    .then(response => response.text())
    .then(data => res.send(data))
    
})

module.exports = router;
