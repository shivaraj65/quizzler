import React,{useState} from 'react'
import GoogleLogin from 'react-google-login'
import './login.css'
import logo from '../../assets/images/quizzler logo.png'
import Navbar from './navbar/navbarLanding'
import axios from 'axios'
import * as QueryString from "query-string"
import { useHistory } from "react-router-dom";

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const Login =()=>{
    let history = useHistory();
    const redirect=(path)=>{
        history.push(path)
    }

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [userType, setUserType] = useState("user")

    

    const [popupContent,setPopupContent]=useState("")

    // states and function for the modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const responseGoogle = (response) => {
        if(response.error){
            console.log("error")
        }else{
            console.log(response.profileObj.email);
            console.log(response.profileObj.name);
            //send these data to the server..
             // axios 
             let formData = {Email: response.profileObj.email};    
             // console.log(QueryString.stringify(formData));  
             //header configuration for the CORS
             const config  = {
                     headers: {
                         'Content-Type': 'application/x-www-form-urlencoded',
                         'Access-Control-Allow-Origin':'*'
                     }}
                     axios.post('https://quizzlerserver.herokuapp.com/loginGoogleUser', 
                     QueryString.stringify(formData),config)
                     .then(function (response) {
                        //  console.log(response.data);
                        if(response.data.id){
                            redirect("/ul/"+response.data.id+"/"+response.data.name);
                        }else{
                            setPopupContent(response.data);
                            handleShow();
                        }                                                 
                     })
                     .catch(function (error) {
                        setPopupContent("Oh snap! Something went wrong, try again.");
                        handleShow();
                        //  console.log(error);
                     });
        }
      }


//submit handler for the website signup
const submitHandlerLogin=(event)=>{
    event.preventDefault();
    
         // axios 
         let formData = {Email: email,Password: password,Type:userType};    
         // console.log(QueryString.stringify(formData));  
         //header configuration for the CORS
         const config  = {
                 headers: {
                     'Content-Type': 'application/x-www-form-urlencoded',
                     'Access-Control-Allow-Origin':'*'
                 }}
        if(userType==="user"){
            axios.post('https://quizzlerserver.herokuapp.com/loginWebsiteUser', 
            QueryString.stringify(formData),config)
            .then(function (response) {
                // console.log(response.data);
                setPopupContent(response.data);
                //redirect to the userdash
                if(response.data.id){
                    redirect("/ul/"+response.data.id+"/"+response.data.name);
                }else{
                    setPopupContent(response.data)
                    handleShow()
                }
            })
            .catch(function (error) {
                setPopupContent("Oh snap! Something went wrong, Try again.");
                handleShow();
            });
        }else if(userType==="creator"){
            axios.post('https://quizzlerserver.herokuapp.com/loginWebsiteCreator', 
            QueryString.stringify(formData),config)
            .then(function (response) {
                if(response.data.id){
                    redirect("/cl/"+response.data.id+"/"+response.data.name);
                }else{
                    setPopupContent(response.data);
                    handleShow();
                }                
            })
            .catch(function (error) {
                setPopupContent("Oh snap! Something went wrong, Try again.");
                handleShow();
            });
        }       
}      

    return(
        <div>
        <Navbar/>
        <div className="text-center" id="login">
            <form 
                className="form-signin card" 
                onSubmit={submitHandlerLogin}>
                {/* <img className="mb-1" src={logo} alt="" width="120" height="60"/> */}
                <h1 className="h3 mb-3 font-weight-bold text-primary">LOGIN</h1>
                <label className="sr-only">Email address</label>
                <input 
                    type="email" 
                    id="inputEmail" 
                    className="form-control text-primary" 
                    placeholder="Email address" 
                    value={email}
                    required 
                    autoFocus
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}    
                    />
                <label className="sr-only">Password</label>
                <input 
                    type="password" 
                    id="inputPassword" 
                    className="form-control text-primary" 
                    placeholder="Password" 
                    value={password}
                    required
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                    />
                <div className="form-group">
                <label className="sr-only">User Type</label>
                <select 
                    className="form-control text-primary" 
                    id="userType"
                    value={userType}
                    onChange={(e)=>{
                        setUserType(e.target.value)
                    }}
                    >
                    <option>user</option>
                    <option>creator</option>
                </select>
                </div>
                
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <div className="mt-2"><a href="#" className="text-danger">Reset password</a></div>
                
                <hr/>
                {/* <p className="text-secondary">or</p> */}
                <h6 className="text-secondary">Google auth is for users only</h6>
                <GoogleLogin
                    clientId="987356181579-d89ri7e77o4373stfrjo4ie6o6lqgfpl.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </form>
        </div>
         {/* popup  */}
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
            >
            <Modal.Header closeButton>
            <Modal.Title>Quizzler</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {popupContent}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        </div>
    )
}
export default React.memo(Login)