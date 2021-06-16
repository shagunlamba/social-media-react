import React, { Fragment, useState, useEffect } from 'react';
import HomeImg from '../../Assets/images/home-image.jpeg'
import { Container, Row, Col } from 'react-bootstrap';
import classes from './Home.module.css';
import Navbar from '../../components/Navbar/Navbar';
import ReactTypingEffect from 'react-typing-effect';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Particles from 'react-particles-js';
import axios from 'axios';
import BASE_URL from '../../config';

const Home = () => {

    const [RegUsers, setRegUsers] = useState('');

    useEffect(()=>{
        axios.get(`${BASE_URL}/user/getUsers`).then((res)=>{
            console.log(res);
            setRegUsers(res.data.length);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);

    return (
        <Fragment>
        <Navbar iconName="home" />
        <div className="particles-custom">
            <Particles 
                height= "80%"
                params={{
                        particles: {
                            line_linked: {
                                shadow: {
                                    enable: true,
                                    color: "#ffabe1",
                                    blur: 5
                                }
                            }
                        }
                    }}
                style={{position: "absolute"}}
            />
        </div>
        <div className={classes.Home}>
            <Container>
                <Row>
                        <Col xs={12} md={6} classes={classes.contentContainer}>
                            <h1 className={classes.Homeheading}>U N I F Y</h1>
                            <p>
                                <ReactTypingEffect
                                    text={[" Where heart's connect", ]}
                                    cursorRenderer={cursor => <h5>{cursor}</h5>} 
                                />
                            </p>
                            <p>
                                    Find your friends and connect with them today.
                            </p>
                            <p style={{color: '#ce1f6a'}}>
                                Number of Registered Users : {RegUsers}
                            </p>

                            <Link to="/login" className={classes["square_btn"]}>Login</Link>
                            <Link to="/register" className={classes["square_btn"]}>Register</Link>


                        </Col>

                        <Col xs={12} md={6} className={classes.ImageContainer}>
                            <img src={HomeImg} alt="girl-img" className={classes.img1} />
                        </Col>
                </Row>
            </Container>
        </div>
        <Footer />
        </Fragment>
    )
}

export default Home;