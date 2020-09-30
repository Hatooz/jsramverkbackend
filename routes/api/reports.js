var express = require('express');
var router = express.Router();
const path = require('path')
const dbPath = path.resolve(__dirname, '../../db/texts.sqlite')
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(dbPath);
const jwt = require('jsonwebtoken');

// const path = require('path')
// const dbPath = path.resolve(__dirname, '../../db/texts.sqlite')
// const sqlite3 = require('sqlite3').verbose();
// let db = new sqlite3.Database(dbPath);

//Get personal presentation
router.get('/week/:id', (req, res) => {
    const number = req.params.id;  
    const week = weeks.find(week => week.id === number)    
    res.send(week)
});

router.post('/', 
    (req, res, next) => checkToken(req, res, next),     
    (req, res) => {
        db.run("INSERT INTO texts (kmom, redovisning) VALUES (?, ?)",
        req.body.kmom,
        req.body.redovisning,
        (err) => {
        if (err) {
            console.log(err.message)
        }
        console.log("success")
        res.send("201")
    });
});
router.put('/', 
    (req, res, next) => checkToken(req, res, next),     
    (req, res) => {
        db.run(`UPDATE texts
        SET redovisning = ?
        WHERE kmom = ?`,        
        req.body.redovisning,
        req.body.kmom,
        (err) => {
        if (err) {
            console.log(err.message)
        }
        console.log("success")
        res.send("201")
    });
});

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];
    const secret = process.env.JWT_SECRET;

    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            // send error response
            res.sendStatus(403)
            return;
        }

        // Valid token send on the request
        next();
    });
}



const weeks = [
        {
            id: "1",
            repo: "<h2>Github repo <a href='https://github.com/Hatooz/jsramverk'> here</a></h2><br>",
            setup: `<h2>Project setup</h2> 
            npm install
            
            
            <h2> Compiles and hot-reloads for development</h2>
            
            npm run serve
            
            
            <h2> Compiles and minifies for production</h2>
            
            npm run build
            
            
            <h2> Lints and fixes files </h2>
            
            npm run lint
            
            
            <h2> Customize configuration</h2>
            See [Configuration Reference](https://cli.vuejs.org/config/).`
        },
        {
            id: "2",
            repo: "<h2>Github repo <a href='https://github.com/Hatooz/jsramverk'> here</a></h2><br>",
            setup: `<h2>Project setup</h2> 
            npm install
            
            
            <h2> Compiles and hot-reloads for development</h2>
            
            npm run serve
            
            
            <h2> Compiles and minifies for production</h2>
            
            npm run build
            
            
            <h2> Lints and fixes files </h2>
            
            npm run lint
            
            
            <h2> Customize configuration</h2>
            See [Configuration Reference](https://cli.vuejs.org/config/).`
        }
]
   




module.exports = router;


