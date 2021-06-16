import React, { useState } from 'react';
import classes from './Register.module.css';
import Navbar from '../../components/Navbar/Navbar';
import { Fragment } from 'react';
import { Row, Col, Form, Spinner } from 'react-bootstrap';
import Footer from '../../components/Footer/Footer';
import { FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import BASE_URL from '../../config';
import swal from 'sweetalert';

const checkUsername = RegExp(/^[a-zA-Z0-9]*$/);

const validFullName = RegExp(/^[a-zA-Z ]*$/);

const Register = () => {

    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('Male');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [Loading, setLoading] = useState(false);

    const [inputError, setInputError] = useState({
        fullName: '',
        age: '',
        username: '',
        password: ''
    });

    const [type, setType] = useState('password');
    const toggleType = () => {
        setType((prevState) => {
        if (prevState === 'password')
            return 'text';
        return 'password';
        })
    }

    const fullNameChangeHandler = (e)=>{
        const val = e.target.value;
        setFullName(val);
        if(val===''){
            setInputError((prevState)=>{
                return {
                    ...prevState,
                    fullName: ''
                }
            });
        }
        else if(validFullName.test(val) === false){
            setInputError((prevState)=>{
                return {
                    ...prevState,
                    fullName: 'Full Name should only consist of alphabets and space'
                }
            });
        }
        else{
            setInputError((prevState)=>{
                return {
                    ...prevState,
                    fullName: ''
                }
            });
        }
    }

    const ageChangeHandler = (e)=>{
        const val = e.target.value;
        setAge(val);
        if(val===''){
            setInputError((prevState)=>{
                return {
                    ...prevState,
                    age: ''
                }
            });
        }
        else if(isNaN(val)){
            setInputError((prevState)=>{
                return {
                    ...prevState,
                    age: 'Enter a valid age'
                }
            });
        }
        else if(+val<=15){
            setInputError((prevState)=>{
                return {
                    ...prevState,
                    age: 'Age must be above 15'
                }
            });
        }
        else{
            setInputError((prevState)=>{
                return {
                    ...prevState,
                    age: ''
                }
            });
        }
    }

    const genderChangeHandler = (e)=>{
        const val = e.target.value;
        setGender(val);
    }


    const usernameChangeHandler = (e)=>{
        const val = e.target.value;
        setUsername(val);
        console.log(val);
        console.log(checkUsername.test(val));
        if(val===''){
            setInputError((prevState)=>{
                return {
                    ...prevState,
                    username: ''
                }
            });
        }
        else if(checkUsername.test(val) === false){
            setInputError((prevState)=>{
                return {
                    ...prevState,
                    username: 'No special characters or spaces allowed'
                }
            });
        }
        else{
            setInputError((prevState)=>{
                return {
                    ...prevState,
                    username: ''
                }
            });
        }
    }

    const passwordChangeHandler = (e)=>{
        const val = e.target.value;
        setPassword(val);
    }
    

    const onSubmitHandler = (e)=> {
        e.preventDefault();

        if(inputError.fullName!=='' || inputError.age!=='' || inputError.username!=='' || inputError.password!==''){
            return;
        }

        if(fullName===''){
            setInputError((prevState)=>{
                return {
                    ...prevState,
                    fullName: 'Full Name can\'t be empty'
                }
            });
            return;
        }

        if(age===''){
            setInputError((prevState)=>{
                return {
                    ...prevState,
                    age: 'Age can\'t be empty'
                }
            });
            return;
        }

        if(username===''){
            setInputError((prevState)=>{
                return {
                    ...prevState,
                    username: 'Username can\'t be empty'
                }
            });
            return;
        }

        if(password ===''){
            setInputError((prevState)=>{
                return {
                    ...prevState,
                    age: 'Password can\'t be empty'
                }
            });
            return;
        }
      


        setLoading(true);
        const obj={
            fullName: fullName,
            age: age,
            gender: gender,
            username: username,
            password: password
        }
        axios.post(`${BASE_URL}/user/register`, obj).then((res)=>{
            console.log("The response: ",res);
            if('message' in res.data){
                setInputError((prevState)=>{
                    return {
                        ...prevState,
                        username: res.data.message
                    }
                })
            }
            setLoading(false);
            swal({
                title: "User Registered!",
                text: "Please Login to continue!",
                icon: "success",
            });
            setFullName('');
            setAge('');
            setUsername('');
            setPassword('');
        })
        .catch((err)=>{
            console.log("The error",err);
            setLoading(false);
        });
    }

    return (
        <Fragment>
            <Navbar iconName="register" />
            <div className={classes.register}>
                <h1>Registeration</h1>
            <div className={classes.registerForm}>
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group>
                        <Form.Label 
                        className={classes.formLabel}
                        >Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="fullName"
                            value={fullName}
                            placeholder="Full Name..."
                            className="shadow-none"
                            onChange={fullNameChangeHandler}
                        />
                        <p className={classes["error-messages"]}>{inputError.fullName}</p>
                    </Form.Group>

                    <Row>
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label 
                            className={classes.formLabel}
                            >Age</Form.Label>
                            <Form.Control
                                style={{
                                marginLeft: "45px"
                                }}
                                type="text"
                                name="age"
                                placeholder="Age.."
                                className="shadow-none"
                                value={age}
                                onChange={ageChangeHandler}
                            />
                             <p className={classes["error-messages"]}>{inputError.age}</p>
                        </Form.Group>
                    </Col>

                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label 
                            className={classes.formLabel}
                            style={{
                                marginLeft: "0"
                            }}
                            >Gender</Form.Label>
                            <Form.Control
                                as="select"
                                name="gender"
                                className="shadow-none"
                                style={{
                                    width: "79%",
                                    paddingLeft: "6px"
                                }}
                                value={gender}
                                onChange={genderChangeHandler}
                            >
                                <option>Male</option>
                                <option>Female</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    </Row>

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
                        />
                         <p className={classes["error-messages"]}>{inputError.username}</p>
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
                        />
                        <FaEyeSlash className={classes.passwordIcon} onClick={toggleType} />
                        <p className={classes["error-messages"]}>{inputError.password}</p>
                    </Form.Group>
                    <div className="text-center">
                        <button type="submit" className={classes["square_btn"]}>Register</button>
                        {
                                    Loading ? 
                                    <span>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="ml-2"
                                            variant="primary"
                                            />
                                        <span className="sr-only">Loading...</span>
                                    </span>
                                : null
                        }
                    </div>
                </Form>
            </div>
            </div>
            <Footer />
        </Fragment>
    )
}
export default Register;