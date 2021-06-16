import React, { useEffect, useState} from 'react';
import UserNavbar from '../../components/Navbar/UserNavbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../config';
import Footer from '../../components/Footer/Footer';
import { Row, Col, Form} from 'react-bootstrap';
import './IndividualPost.css';
import { Image } from 'cloudinary-react';
import { FiSend } from "react-icons/fi";


const IndividualPost = () => {

    const params = useParams();
    
    const [postArray, setPostArray] = useState([]);
    const [commentContent, setCommentContent] = useState('');
    const [count, setCount] = useState(0);
    const [commentsArray, setCommentsArray] = useState([]);

    useEffect(()=>{
        const postID = params.postID;
        axios.get(`${BASE_URL}/upload/getPost`, {
            params: {
                postID: postID
            }
        })
        .then((res)=>{
            console.log(res);
            setPostArray(res.data[0]);
        })
        .catch((err)=>{
            console.log(err);
        })
        
        axios.get(`${BASE_URL}/upload/getComments`,{
            params: {
                postID: postID
            }
        })
        .then((res)=>{
            console.log("The comments",res);
            setCommentsArray(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })

    },[params.postID, count]);

    const postComment = ()=> {

        const author = JSON.parse(localStorage.getItem('user-info')).username;
        const obj = {
            postID:   params.postID,
            commentContent: commentContent,
            author: author
        }
        console.log("The obj",obj);
        axios.post(`${BASE_URL}/upload/getComments`, obj)
        .then((res)=>{
            console.log(res);
            setCount((prevState)=>{
                return prevState+1;
            });
            setCommentContent('');
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div>
                <UserNavbar iconName="posts" />

                <div className="upload">
                    <Row>
                        
                    <Col>
                            <div className="Post">
                                        <div className="Image">
                                        <Image 
                                            cloudName="du7o5hpad" 
                                            publicId= {postArray.image}
                                        />
                                        </div>
                                        <div className="Content">
                                            <div className="title">  {postArray.title}/ by @{postArray.author}</div>
                                            <div className="description"> {postArray.description} </div>
                                        </div>
                            </div>
                    </Col>

                    <Col>
                            <div className="Post">
                                     <h1 className="comments-heading">Comments</h1>
                                     <div className="Comments">
                                            {
                                                commentsArray.map((el)=>{
                                                    return (
                                                        <div className="comments-block">
                                                            <div>@{el.author}</div>
                                                            <div>{el.commentContent}</div>
                                                        </div>
                                                    )
                                                })
                                            }
                                     </div>
                                     <div>
                                        <Form.Group>
                                            <Form.Control
                                                type="text"
                                                placeholder="Add a comment ..."
                                                className="shadow-none"
                                                value={commentContent}
                                                onChange={
                                                    (e)=> setCommentContent(e.target.value)
                                                }
                                            />
                                            <FiSend 
                                                className="post-comment" 
                                                onClick= {postComment}
                                            />
                                        </Form.Group>
                                     </div>
                            </div>
                    </Col>

                        

                    </Row>
                </div>
            <Footer />

        </div>
    )
}

export default IndividualPost;