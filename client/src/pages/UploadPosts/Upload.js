import React, { useState , useEffect } from 'react';
import UserNavbar from '../../components/Navbar/UserNavbar';
import classes from './Upload.module.css';
import Footer from '../../components/Footer/Footer';
import { Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import BASE_URL from '../../config';
import { useHistory } from 'react-router-dom';
import ReactFileReader from 'react-file-reader';
import { BsCloudUpload } from 'react-icons/bs';
import swal from 'sweetalert';



const Upload = () => {

    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState([]);
    const [fileName, setFileName] = useState('');
    const [fileError, setFileError] = useState('');
    const [file, setFile] = useState(null);

    const [author, setAuthor] = useState('');

    useEffect(()=>{
        const localStr = JSON.parse(localStorage.getItem('user-info'));
        setAuthor(localStr.username);
    },[]);

    const handleFiles = files => {
        setImage(files);
        console.log(files);
        setFile(URL.createObjectURL(files[0]));
        var reader = new FileReader();
        reader.onload = function(e) {
                e.preventDefault();
                const nameOfTheFile= (files[0].name);
                setFileName(nameOfTheFile);
                setFileError('');
        }
        reader.readAsText(files[0]);
    }

    const onSubmitHandler= ()=>{

        const formData = new FormData();
        formData.append("file",image[0]);
        formData.append("upload_preset", "w9wt7bfe");

        return axios({
                method: 'post',
                url: 'https://api.cloudinary.com/v1_1/du7o5hpad/image/upload',
                data: formData
        })
        .then(response => {
            const fileName = response.data.public_id;
            const localStr = JSON.parse(localStorage.getItem('user-info'));
                return axios({
                    method: 'post',
                    url: `${BASE_URL}/upload`,
                    data: {
                        title: title, 
                        description: description, 
                        image: fileName,
                        author: localStr.username
                    }
                })
            })
            .then(response => {
                console.log("db", response);
        })

    }   

    const btnClickHandler = (e)=>{
        e.preventDefault();

        if(fileName===''){
            setFileError('Please select an image to upload!');
            return;
        }

        onSubmitHandler()
        .then(
            swal({
                title: "Posted!",
                icon: "success",
              }),
            setInterval(()=>{
                history.push("/feed")
            }, 2000)
        );
    }

    return (
        <div>
            <UserNavbar iconName="upload" />
            <div className={classes.upload}>
            <Row>
                <Col>
                <div className={classes.uploadForm}>
                    <h1>Create a post!</h1>

                    <Form>
                        <Form.Group>
                            <Form.Label 
                            className={classes.formLabel}
                            >Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Title.."
                                className="shadow-none"
                                value={title}
                                onChange={
                                    (e)=>{
                                        setTitle(e.target.value);
                                    }
                                }
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label 
                            className={classes.formLabel}
                            >Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                placeholder="Description.."
                                className="shadow-none"
                                value={description}
                                onChange={
                                    (e)=>{
                                        setDescription(e.target.value);
                                    }
                                }
                            />
                        </Form.Group>
                        
                        <div className="text-center">
                            <ReactFileReader handleFiles={handleFiles} fileTypes={['.jpg', '.png', '.jpeg']}>
                                    <button className={classes.customButton} onClick={(e)=> e.preventDefault() }>
                                        Upload Image
                                        <BsCloudUpload style={{
                                            marginLeft: "5px"
                                        }}/>
                                    </button>
                            </ReactFileReader>
                            <p className="mt-1">{fileName}<span style={{color: "#dc3545"}}>{fileError}</span></p>
                    
                            <button onClick={btnClickHandler} className={classes["square_btn"]}>Create</button>
                        </div>

                    </Form>
                </div>
                </Col>

                <Col>
               
                        <div className={classes.Post}>
                                    <div className={classes.Image}>
                                        {
                                            fileName===''?
                                            <div className={classes.preview}>
                                                A preview of your post!
                                            </div>:
                                            <img src={file} alt="" />
                                        }
                                    </div>
                                    <div className={classes.Content}>
                                        <div className={classes.title}> {title} / by @{author}</div>
                                        <div className={classes.description}> {description} </div>
                                    </div>
                        </div>
                </Col>

            </Row>
            </div>
            <Footer />
        </div>
    )
}
export default Upload;