import React , { useState, useEffect } from 'react';
import UserNavbar from '../../components/Navbar/UserNavbar';
import './Profile.css';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import BASE_URL from '../../config';
import { MdDelete } from "react-icons/md";
import { useParams, useHistory } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";
import swal from 'sweetalert';

const Profile = () => {

    const history = useHistory();

    const [postsArray, setPostsArray] = useState([]);
    const [userDetails, setUserDetails] = useState({
        username: '',
        fullName: '',
        age: '',
        gender: ''
    });

    const params = useParams();

    const [LocalStorageUser, setUser] = useState('');

     // MODALS
     const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);


    useEffect(()=>{

        const username = params.username;

        const localStrUser = JSON.parse(localStorage.getItem('user-info'));
        setUser(localStrUser.username);

        axios.get(`${BASE_URL}/upload/userPosts`, {
            params: {
                username: username
            }
        })
        .then((res)=>{
            console.log(res);
            setPostsArray(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })

        axios.get(`${BASE_URL}/upload/userDetails`,{
            params: {
                username: username
            }
        })
        .then((res)=>{
            console.log("The res", res);
            setUserDetails(()=>{
                return {
                    username: res.data[0].username,
                    fullName: res.data[0].fullName,
                    age: res.data[0].age,
                    gender: res.data[0].gender
                }
            })
        })
        .catch((err)=>{
            console.log(err);
        })

    }, [show]);


   

    const deletePost = (postID) => {

        console.log("id", postID);
        axios.post(`${BASE_URL}/upload/deletePost`, { postID : postID })
        .then((res)=>{
            console.log(res);
            console.log("Deleted!");
        })
        .catch((err)=>{
            console.log(err);
        })

        setShow(false);
    }

    const logoutHandler= ()=>{
        swal({
            title: "Logged out!",
            icon: "success",
        });
        localStorage.removeItem('user-info');
        history.push('/');
    }

    
    return (
        <div>
            <UserNavbar iconName="profile" />
            <div>
                <header>
                    <Row className="userArea">
                        <Col xs={12} className="user">
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <div>
                                    @{userDetails.username}
                                </div>
                                {LocalStorageUser=== userDetails.username?
                                <div onClick={logoutHandler}>
                                    <FiLogOut className="logout--icon"/>
                                </div>
                                :null}
                            </div>
                            <div>
                                {userDetails.fullName}, {userDetails.age}
                            </div>
                        </Col>
                      
                    </Row>
                </header>
            </div>
            <div>

                        <div className="Feed">

                        {postsArray.length===0 ? 
                        <div style={{
                            color: "#6155a6",
                            position: "relative",
                            bottom: "50px",
                            cursor: "pointer"
                        }}
                        onClick={
                            ()=>history.push({pathname: `/upload`})}
                        >
                            You haven't posted anything! Click Here to make your first upload!
                        </div>
                        :null}

                        {   
                            postsArray.map((el)=>{
                                return (
                                    <div xs={12} md={6} className="Post" key={el.id}>
                                    {/* {console.log("El.ID", el.id)} */}
                                        <div className="Image">
                                            <Image 
                                                cloudName="du7o5hpad" 
                                                publicId= {el.image}
                                                />
                                        </div>
                                        <div className="Content">
                                            <div className="title">{el.title} / by @{el.author}</div>
                                            <div className="description"> {el.description} </div>
                                            <div className="d-flex justify-content-between">
                                                <span
                                                style = {{
                                                    display: "inline-block",
                                                    marginLeft: "5px",
                                                    fontSize: "20px"
                                                }}
                                                >{el.likes} likes</span>

                                                {
                                                LocalStorageUser=== userDetails.username?
                                                <React.Fragment>
                                                    <span
                                                    style = {{
                                                        display: "inline-block",
                                                        marginRight: "5px",
                                                    }}
                                                    onClick={
                                                            ()=>{
                                                                deletePost(el.id)
                                                                handleShow();
                                                            }
                                                    }
                                                    >
                                                        <MdDelete className="delete--icon" />
                                                    </span>
                                                    
                                                    <Modal show={show} onHide={handleClose}>
                                                        <Modal.Header closeButton>
                                                        <Modal.Title>Post Deleted!</Modal.Title>
                                                        </Modal.Header>
                                                    </Modal>
                                                </React.Fragment>
                                                : null
                                                }

                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
            </div>
        </div>
    )
}

export default Profile;