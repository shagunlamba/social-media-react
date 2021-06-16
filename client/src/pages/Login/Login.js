import React, { useState } from 'react';
import classes from './Login.module.css';
import Navbar from '../../components/Navbar/Navbar';
import { Fragment } from 'react';
import { Form } from 'react-bootstrap';
import Footer from '../../components/Footer/Footer';
import { FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import BASE_URL from '../../config';
import { useHistory } from 'react-router-dom';

const Login = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('password');
    const toggleType = () => {
        setType((prevState) => {
        if (prevState === 'password')
            return 'text';
        return 'password';
        })
    }
    const history = useHistory();

    const usernameChangeHandler = (e)=>{
        const val = e.target.value;
        setUsername(val);
        setErrorMessage('')
    }

    const passwordChangeHandler = (e)=>{
        const val = e.target.value;
        setPassword(val);
        setErrorMessage('')
    }

    const [errorMessage, setErrorMessage] = useState('');

    const onSubmitHandler = (e)=> {
        e.preventDefault();
        const obj = {
            username: username,
            password: password
        };
        axios.post(`${BASE_URL}/user/login`, obj).then((res)=>{
            console.log("The resp", res);
            if(res.data.loggedIn){
                const newobj = {
                    loggedIn: true,
                    username: username
                }
                localStorage.setItem('user-info', JSON.stringify(newobj));
                props.setAuth(JSON.stringify(newobj));
                history.push('/feed');
            }
            else{
                setErrorMessage(res.data.message);
            }
        })
        .catch((err)=>{
            console.log("The resp", err);
        });
    }

    return (
        <Fragment>
            <Navbar iconName="login" />
            <div className={classes.login}>
                <h1>Login</h1>
            <div className={classes.loginForm}>
                <Form onSubmit={onSubmitHandler} autoComplete="new-password">
                    <input type="hidden" value="prayer" />
                    <Form.Group>
                        <Form.Label 
                        className={classes.formLabel}
                        >Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={username}
                            placeholder="Username..."
                            className="shadow-none"
                            onChange={usernameChangeHandler}
                            autoComplete="off"
                        />
                    </Form.Group>

                    <Form.Group className={classes["form-group--password"]}>
                        <Form.Label
                        className={classes.formLabel}
                        >Password</Form.Label>
                        <Form.Control
                            type={type}
                            name="password"
                            value={password}
                            placeholder="Password..."
                            className="shadow-none"
                            onChange={passwordChangeHandler}
                            autoComplete="off"
                        />
                        <FaEyeSlash className={classes.passwordIcon} onClick={toggleType} />
                    </Form.Group>

                    <div className="text-center">
                        <p className={classes["error-messages"]}>{errorMessage}</p>
                    </div>

                    <div className="text-center">
                        <button type="submit" className={classes["square_btn"]}>Login</button>
                    </div>

                

                </Form>
            </div>
            </div>
            <Footer />
        </Fragment>
    )
}
export default Login;