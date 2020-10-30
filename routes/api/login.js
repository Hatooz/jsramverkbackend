var express = require('express');
var router = express.Router();
const path = require('path')
const dbPath = path.resolve(__dirname, '../../db/database.js');
const sqlite3 = require('sqlite3').verbose();
let db = require('../../db/database.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var salt = bcrypt.genSaltSync(10);


router.post('/', (req, res) => {    
    let sql = `SELECT * FROM users WHERE email = ?`;
    db.get(sql, [req.body.email], (err, row) => {
        if (err) {
            throw err;
        }
        const email = row.email;
        const hash = row.password;
        const secret = process.env.JWT_SECRET || "laskhfhsafhalskjhfjkhasjkh3jk2h4jk21g34hjg12hrqwkjhrklj2h134kljh213l5kjh21kj3hlkjw";


        let token;
        bcrypt.compare(req.body.password, hash, function(err, result) {           
            if (!result) {
                res.sendStatus(401);
                return;
            }
            if (result) {
                token = jwt.sign({email: email}, secret, {expiresIn: '1h'})
                console.log("logged in successfully!")
            }
            res.json({token})
        });
    })
});

module.exports = router;


