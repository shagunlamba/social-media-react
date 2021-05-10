const e = require("express");
const express = require("express");
const router = express.Router();
const db = require('../config/db');


router.post('/', (req,res)=>{
   
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;
    const author = req.body.author;

    db.query(
        "INSERT INTO Uploads (title, description, image, author) VALUES (?,?,?,?)", 
            [title, description, image, author] ,
                (err,results) =>{
                console.log("The error", err);
                console.log("The response", results);
             });
});


router.get('/', (req,res)=>{

    db.query(
        "Select * FROM Uploads", 
                (err,results) =>{
                    if(err){
                        console.log("The error", err);
                    }
                    else{
                        // console.log("The response", results);
                        res.send(results);
                    }
             });
});


router.post('/like', (req,res)=>{
   
    const userLiking = req.body.userLiking;
    const postID = req.body.postID;

    // db.query(
    //     "Select * from Likes WHERE (userLiking, PostID) = (?,?)", 
    //         [userLiking, postID] ,
    //             (err,results) =>{
    //                 if(err){
    //                     console.log("The error", err);
    //                 }
    //                 else{
    //                     console.log("The dislike result 1: ", results);
    //                     if(results.length>0){
    //                         db.query("UPDATE Uploads SET likes = likes - 1 WHERE id = ?", postID,
    //                         (err2, result2)=>{
    //                             if(err2){
    //                                 console.log(err2)
    //                             }
    //                             console.log("The dislike result 2:", result2);
    //                             db.query("Delete from Likes Where userLiking = ? and PostID = ?", [userLiking, postID],
    //                                 (err3, result3)=>{
    //                                     if(err3){
    //                                         console.log(err3);
    //                                     }
    //                                     else{  
    //                                         console.log("The dislike result 3: ",result3);
    //                                     }
    //                             });              
    //                         })
    //                         res.send('You disliked the post');
    //                         return;
    //                     }
    //                 }
    // });

    db.query(
        "INSERT INTO Likes (userLiking, PostID) VALUES (?,?)", 
            [userLiking, postID] ,
                (err,results) =>{
                    if(err){
                        console.log("The error", err);
                    }
                    else{
                        console.log("The Insert result 1 - ", results);
                        db.query("UPDATE Uploads SET likes = likes + 1 WHERE id = ?", postID,
                        (err2, result2)=>{
                            if(err2){
                                console.log(err2)
                            }
                            else{
                                console.log("The Insert result 2 -", result2);
                            }
                        })
                        res.send('You liked the post');
                        return;
                    }
    });
});




router.get('/userPosts', (req,res)=>{

    const username = req.query.username;

    db.query(
        "Select * FROM Uploads where author = ?" , [username] , 
                (err,results) =>{
                    if(err){
                        console.log("The error", err);
                    }
                    else{
                        // console.log("The response", results);
                        res.send(results);
                    }
             });
});


router.get('/userDetails', (req,res)=>{

    const username = req.query.username;
    // console.log(req);

    db.query(
        "Select * FROM Users where username = ?" , [username] , 
                (err,results) =>{
                    if(err){
                        console.log("The error", err);
                    }
                    else{
                        // console.log("The response", results);
                        res.send(results);
                    }
             });
});

router.post('/deletePost', (req,res)=>{

    const postID = req.body.postID;
    // console.log(req);

    db.query(
        "Delete FROM Uploads where id = ?" , [postID] , 
                (err,results) =>{
                    if(err){
                        console.log("The error", err);
                    }
                    else{
                        // console.log("The response", results);
                        res.send(results);
                    }
             });
});

router.get('/getPost', (req,res)=>{

    const postID = req.query.postID;

    db.query(
        "Select * FROM Uploads where id = ?" , [postID] , 
                (err,results) =>{
                    if(err){
                        console.log("The error", err);
                    }
                    else{
                        // console.log("The response", results);
                        res.send(results);
                    }
             });
});


router.get('/getComments', (req,res)=>{

    const postID = req.query.postID;

    db.query(
        "Select * FROM Comments where postID = ?" , [postID] , 
                (err,results) =>{
                    if(err){
                        console.log("The error", err);
                    }
                    else{
                        // console.log("The response", results);
                        res.send(results);
                    }
             });
});


router.post('/getComments', (req,res)=>{

   const postID = req.body.postID;
   const commentContent = req.body.commentContent;
   const author = req.body.author;
   console.log("The request body",req.body);
   
    db.query(
        "INSERT INTO Comments (postID, commentContent, author) VALUES (?,?,?)" , [postID, commentContent, author] , 
                (err,results) =>{
                    if(err){
                        console.log("The error", err);
                    }
                    else{
                        console.log("The response", results);
                        res.send({message: 'Comment Posted!'});
                        // res.send(results);
                    }
             });
});


module.exports = router;