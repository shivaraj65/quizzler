import React,{useState} from 'react'
import axios from 'axios';
import * as QueryString from "query-string";
import logo from '../../assets/images/quizzler logo.png'
import Navbar from './navbar/navbarLanding'


import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

const SignupCreator=()=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [name,setName]=useState("")
    const [phoneNumber,setPhoneNumber]=useState("")
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


      //submit handler for the website signup
      const submitHandlerSignup=(event)=>{
        event.preventDefault();
        console.log("submit pressed")
        if(passwordTest===true){
            console.log("submit processing");
            // axios 
            let formData = {Email: email,Password: password,Name:name,PhoneNumber:phoneNumber};    
            // console.log(QueryString.stringify(formData));  
            //header configuration for the CORS
            const config  = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin':'*'
                    }}
                    axios.post('http://localhost:3001/signupWebsiteCreator', 
                    QueryString.stringify(formData),config)
                    .then(function (response) {
                        console.log(response.data);
                        setPopupContent(response.data);
                        handleShow();
                    })
                    .catch(function (error) {
                        console.log(error);
                        setPopupContent("Oh snap! Something went wrong, try again.");
                        handleShow();
                    });
        }else{
            console.log("submit not processed")
        }
    }

    return(
        <div>
            <Navbar/>
            <div className="text-center" id="login">
            <form className="form-signin card"  onSubmit={submitHandlerSignup}>
                {/* <img className="m-auto" src={logo} alt=""  height="60"/> */}
                <h1 className="h3 my-3 font-weight-bold text-primary">CREATOR SIGNUP</h1>
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
                <label  className="sr-only">Name</label>
                <input 
                type="text"
                className="form-control text-primary"
                placeholder="User Name"
                value={name}
                required
                onChange={(e)=>{
                    setName(e.target.value)
                }}
                />
                <label className="sr-only">Phone Number</label>
                <input
                    type="tel"
                    className="form-control text-primary"
                    placeholder="phone Number"
                    value={phoneNumber}
                    maxLength="10"
                    required
                    onChange={(e)=>{
                        setPhoneNumber(e.target.value)
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
                    className="btn btn-lg btn-primary btn-block" 
                    type="submit"
                >Sign up</button>
                <hr className="mb-1" />
                <p className=" mt-2 text-secondary">A Three step Auth process will be done to confirm that it is you.</p>
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
export default React.memo(SignupCreator);


