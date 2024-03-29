'use strict';

const express = require('express');
const router = express.Router();
const moment = require('moment');
// let connection = require('../../../mysql');
const uuidv4 = require('uuid/v4');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('supota', 'root', 'root', {
    dialect: 'mysql'
});

// GET  http://localhost:3000/v1/player/all
router.get('/all', function (req, res, next) {
    sequelize.query("select * from player").spread((results, metadata) => {
        res.json(results);
        console.log(results);
        console.log(" GET: " + req.url)
        sequelize.close();
    })
})

// GET  http://localhost:3000/v1/player/sample
router.get('/sample', function (req, res, next) {
    res.json("This is sample API")
    console.log(" GET: " + req.url)
})

// GET  http://localhost:3000/v1/player
router.get('/', function (req, res, next) {
    const getPlayerData = [{
            name: '今井美香',
            sex: 0
        },
        {
            name: '紀川孝太',
            sex: 1
        },
        {
            name: '山田太郎',
            sex: 1
        }
    ];
    res.json(getPlayerData);
    console.log(" GET: " + req.url)
});

// GET  http://localhost:3000/v1/player/:id
router.get("/:id", (req, res) => {
    let player = {
        id: req.params.id,
        name: "tanaka",
        role: "group1"
    }
    res.json(player);
    console.log(" GET: " + req.url)
});

// POST  http://localhost:3000/v1/player
router.post('/', (req, res) => {
    let playerList = []
    let postPlayerData = req.body;
    let postPlayerName = postPlayerData.name;
    let postPlayerSex = postPlayerData.sex;
    const playerId = uuidv4();
    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

    let playerItem = {
        playerId,
        createdAt,
        name: postPlayerName,
        sex: postPlayerSex
    };

    playerList.push(playerItem);
    res.json(playerItem);

    console.log("POST: " + req.url)
});

//routerをモジュールとして扱う準備
module.exports = router;