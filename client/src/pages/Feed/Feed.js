import React, { useState, useEffect } from 'react';
import classes from './Feed.module.css';
import Footer from '../../components/Footer/Footer';
import USerNavbar from '../../components/Navbar/UserNavbar';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import BASE_URL from '../../config';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { useHistory } from 'react-router-dom';

const Feed = () => {

    const history = useHistory();

    const [postsArray, setPostsArray] = useState([]);
    const [likes, setLikes] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(()=>{
        
        axios.get(`${BASE_URL}/upload`)
        .then((response)=>{
            setPostsArray(response.data);
        })
        .catch((err)=>{
            console.log(err);
        });

    },[likes, count]);

    const likePost = (id)=>{
        console.log("HERE");
        setLikes((prevState)=>{
            return !prevState;
        })
        const localStr = JSON.parse(localStorage.getItem('user-info'));
        const userLiking = localStr.username;
        axios.post(`${BASE_URL}/upload/like`, {
            userLiking: userLiking,
            postID: id
        })
        .then((res)=>{
            console.log(res);
            setCount((prevState)=>{
                return prevState+1;
            })
        })
        .catch((err)=>{
            console.log("The error",err);
        })
    }

    const handleUserProfileClick= (e, username)=>{
        e.stopPropagation();
        console.log("Clicked!");
        history.push(`/profile/${username}`);
    }

    return (
        <div>
            <USerNavbar iconName="home" />
            <div className={classes.Feed}>
                {   
                    postsArray.map((el)=>{
                        return (
                            <div className={classes.Post} key={el.id} 
                                 onClick={
                                    ()=> {history.push(`/post/${el.id}`)}
                                 }>
                                <div className={classes.Image}>
                                    <Image 
                                        cloudName="du7o5hpad" 
                                        publicId= {el.image}
                                        />
                                </div>
                                <div className={classes.Content}>
                                    <div className={classes.title}>{el.title} / by @<span className={classes["author--custom"]} onClick={(e)=>{handleUserProfileClick(e, el.author)}}>{el.author}</span></div>
                                    <div className={classes.description}> {el.description} </div>
                                    <div>
                                    <ThumbUpAltIcon 
                                        className={classes.customIcon} 
                                        onClick= {
                                            (e)=>{
                                                e.stopPropagation();
                                                likePost(el.id);
                                            }
                                        }
                                        />
                                        <span
                                        style = {{
                                            display: "inline-block",
                                            marginLeft: "5px",
                                            fontSize: "20px"
                                        }}
                                        >{el.likes}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                
            </div>


            <Footer />
        </div>
    )
}


export default Feed;