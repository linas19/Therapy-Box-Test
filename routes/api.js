const express = require('express');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const router = express.Router();
const User = require('../models/user.model.js')
const fetch = require('isomorphic-fetch');
const Todos = require('../models/todos.model.js')

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

const CLOTHES_URL = `https://therapy-box.co.uk/hackathon/clothing-api.php?username=swapnil`
router.get('/clothes', (req, res) => {
    fetch(CLOTHES_URL)
    .then(response => response.text())
    .then(data => res.send(data))
    
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
router.get('/todos', (req, res) => {
    Todos.find({})
        .then((data) => {
            console.log('Todo Data: ', data)
            res.json(data)
        })
        .catch((error) => {
            console.log('error', daerrorta)
        })
})
router.post('/todos', (req, res) => {
    console.log('BODY: ', req.body)
    const data = req.body;
    const newTodo = new Todos(data);
    newTodo.save((error) => {
        if (error) {
            console.log(error)
            res.status(500).json({ msg: 'Sorry, internal server error' });
        } else {
            res.json({
                msg: 'Your todo data was saved!!!'
            })
        }
    })
})

module.exports = router;
