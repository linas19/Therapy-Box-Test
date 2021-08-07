const express = require('express');
const fetch = require('isomorphic-fetch');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const router = express.Router();
const RSS_URL = `http://feeds.bbci.co.uk/news/rss.xml`
router.get('/news', (req, res) => {
    // // Add authentication
    // let token = req.headers["x-access-token"]; 
    // const decoded = jwt.verify(token, config.secret);
    // User.findById(decoded.id)
    //     .then((data) => {
    //         res.json(data)
    //     })
    //     .catch((error) => {
    //         console.log('error', error)
    //     })
    fetch(RSS_URL)
    .then(response => response.text())
    // .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => res.send(data))
    
})

module.exports = router;
