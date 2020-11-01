import React,{useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import {useParams} from "react-router-dom";
import axios from 'axios'
import * as QueryString from "query-string"

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const MailRedirect=()=>{
    let {id}=useParams()

    const [responseData,setResponseData]=useState("")
    // states and function for the modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let history = useHistory();
    const redirect=(path)=>{
        history.push(path)
    }

    useEffect(()=>{
        // axios 
        let formData = {ID:id};    
        // console.log(quizID);
        //header configuration for the CORS
        const config  = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin':'*'
        }}
        axios.post('https://quizzlerserver.herokuapp.com/changeVerification', 
        QueryString.stringify(formData),config)
        .then(function (response) {
            console.log(response.data);
            if(response.data ==="success"){
                setResponseData("verification success")
                handleShow()
            }else if(response.data ==="failed"){
                setResponseData("verification failed.")
                handleShow()
            }
        })
        .catch(function (error) {
            alert("Error!! Check your Network and Try again.")
        });
    },[])

    return(
        <div className="custom-findQuiz-bg fullscreen-custom">
            
                <div className="pt-4 text-center">
                    <div className="card form-signin mt-4">
                        <h5 className="text-secondary">verifying your Account</h5>
                        <hr/>
                        <h5 className="text-primary">{id}</h5>
                    </div>
                </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                >
                <Modal.Header>
                <Modal.Title>Quizzler</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {responseData}
                </Modal.Body>
                <Modal.Footer>

                <Button variant="primary" onClick={()=>{redirect('/login')}}>
                    LOGIN
                </Button>
                </Modal.Footer>
            </Modal>                            
        </div>
    )
}
export default React.memo(MailRedirect)