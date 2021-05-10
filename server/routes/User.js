const express = require("express");
const router = express.Router();
const db = require('../config/db');



router.get('/getUsers', (req,res)=>{
    db.query(
        "Select * from Users", 
                (err,results) =>{
                console.log("The error", err);
                console.log("HERE");
                res.send(results);
             }
    );
})



router.post('/register', (req,res)=>{
   
    const fullName = req.body.fullName;
    const age = req.body.age;
    const gender = req.body.gender;
    const username = req.body.username;
    const password = req.body.password;


    db.query(
        "Select * FROM Users where username = ?", 
            [username] ,
                (err,results) =>{
                    if(err){
                        console.log(err);
                    }
                    if(results.length>0){
                        res.send({message: 'Username already in use'});
                    }
            }
    );

    db.query(
        "INSERT INTO Users (fullName, age, gender, username, password) VALUES (?,?,?,?,?)", 
            [fullName, age, gender, username, password] ,
                (err,results) =>{
                console.log("The error", err);
                console.log("HERE");
                res.send(results);
             }
    );
});

router.post('/login', (req,res)=>{
   
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "Select * from Users Where username = ?", 
            [username] ,
                (err,results) =>{
                    if(err){
                        console.log(err);
                    }
                    if(results.length >0){
                        console.log(results);
                        if(password=== results[0].password){
                            res.json({ loggedIn: true, username: username});
                        }
                        else{
                            res.json({ loggedIn: false, message: 'Wrong username password combo'});
                        }
                    }
                    else{
                        res.json({ loggedIn: false, message: 'User doesnt exist!'});
                    }
                }
            );
});




module.exports = router;