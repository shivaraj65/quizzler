import React,{useState} from 'react'
import GoogleLogin from 'react-google-login'
import logo from '../../assets/images/quizzler logo.png'
import Navbar from './navbar/navbarLanding'
import axios from 'axios'
import * as QueryString from "query-string"

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'




const SignupUser=()=>{
    const [email,setEmail]=useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [password,setPassword]=useState("")
    const [passwordTest, setpasswordTest] = useState(null)

    const [popupContent,setPopupContent]=useState("")

    // states and function for the modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const passwordTestfunc=(data)=>{
        if(!data.match(/[a-z]/g)){
            setpasswordTest(false)
          document.getElementById("password-validation-text").innerHTML = "you must use a small letter"; 
        //   console.log("has no small letters");
        }else if(!data.match(/[A-Z]/g)){
            setpasswordTest(false)
          document.getElementById("password-validation-text").innerHTML = "you must use a capital letter"; 
        //   console.log("has no cap letters")
        } else if(!data.match(/[0-9]/g)){
            setpasswordTest(false)
          document.getElementById("password-validation-text").innerHTML = "you must use a number"; 
        //   console.log("has no a number")
        }else if(!(data.length >= 8)){
            setpasswordTest(false)
          document.getElementById("password-validation-text").innerHTML = "minimum password lenght must be 8"; 
        //   console.log("has no 8 digits")
        }else{
            setpasswordTest(true)
        //   console.log("good password")
          document.getElementById("password-validation-text").innerHTML = ""; 
        }
      }
    
//submit handler for the google auth
    const responseGoogle = (response) => {
        if(response.error){
            console.log("error")
        }else{
            console.log(response.profileObj.email);
            console.log(response.profileObj.name);
            //send these data to the server..
             // axios 
             let formData = {Email: response.profileObj.email,Name:response.profileObj.name};    
             // console.log(QueryString.stringify(formData));  
             //header configuration for the CORS
             const config  = {
                     headers: {
                         'Content-Type': 'application/x-www-form-urlencoded',
                         'Access-Control-Allow-Origin':'*'
                     }}
                     axios.post('https://quizzlerserver.herokuapp.com/signupGoogleUser', 
                     QueryString.stringify(formData),config)
                     .then(function (response) {
                        //  console.log(response.data);
                         setPopupContent(response.data);
                         handleShow();
                        
                     })
                     .catch(function (error) {
                        setPopupContent("Oh snap! Something went wrong, try again.");
                        handleShow();
                        //  console.log(error);
                     });
        }
       
      }

//submit handler for the website signup
      const submitHandlerSignup=(event)=>{
        document.getElementById("btnSubmitUser").disabled = true;
        // console.log("submit pressed")
        if(passwordTest===true){
            // console.log("submit processing");
            // axios 
            let formData = {Email: email,Password: password,Name:fname};    
            // console.log(QueryString.stringify(formData));  
            //header configuration for the CORS
            const config  = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin':'*'
                    }}
                    axios.post('https://quizzlerserver.herokuapp.com/signupWebsiteUser', 
                    QueryString.stringify(formData),config)
                    .then(function (response) {
                        // console.log(response.data);
                        setPopupContent(response.data);
                        handleShow();
                        //cleaning up the fields
                        setEmail("")
                        setPassword("")
                        setFname("")
                        document.getElementById("btnSubmitUser").disabled = false;
                    })
                    .catch(function (error) {
                        setPopupContent("Oh snap! Something went wrong, try again.");
                        handleShow();
                        //cleaning up the fields
                        setEmail("")
                        setPassword("")
                        setFname("")
                        document.getElementById("btnSubmitUser").disabled = false;
                    });
        }else{
            console.log("submit not processed")
        }
    }

 
    return(
        <div>
            <Navbar/>
            <div className="text-center  py-4" id="login">
            <form className="form-signin card" onSubmit={submitHandlerSignup}>
                {/* <img className="mb-3 text-center" src={logo} alt="" width="100" height="50"/> */}
                <h1 className="h3 mb-3 font-weight-bold text-primary">USER SIGNUP</h1>
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
                <label className="sr-only">User Name</label>
                <input 
                    type="Text" 
                    id="inputName" 
                    className="form-control text-primary" 
                    placeholder="User Name" 
                    value={fname}
                    required 
                    onChange={(e)=>{
                        setFname(e.target.value)
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
                        passwordTestfunc(e.target.value);
                    }}
                    />
                
                <p id="password-validation-text" className="text-danger"></p>
                <button 
                    id="btnSubmitUser"
                    className="btn btn-lg btn-primary btn-block" 
                    type="submit"
                    onClick={()=>{
                        
                    }}
                >Sign up</button>
                {/* <div className="mt-2"><a href="#" className="text-danger">forgot password</a></div> */}
                
                <hr/>
                <p className="text-secondary">or</p>
                
                <GoogleLogin
                    clientId="987356181579-d89ri7e77o4373stfrjo4ie6o6lqgfpl.apps.googleusercontent.com"
                    buttonText="Signup with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                              
                <p className=" mt-4 text-warning">we will send a verification mail to authenticate that it is you.</p>
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
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
        </div>
        
    )
}
export default React.memo(SignupUser);