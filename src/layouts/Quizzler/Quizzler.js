import React, {useCallback,useState,useEffect} from 'react'
import axios from 'axios'
import * as QueryString from "query-string"
import { FullScreen, useFullScreenHandle } from "react-full-screen"
import Modal from 'react-bootstrap/Modal'
import {useParams} from "react-router-dom";
import { useHistory } from "react-router-dom";

import Clock from './component/clock/clock'
import './quizzler.css'

const Quizzler=()=>{
    let history = useHistory();
    const redirect=(path)=>{
        history.push(path)
    }
    
    let {quizID,uid,uname}=useParams()
    //states to hold the data
    const [quizData,setQuizData]=useState(null)
    //state for the answers from the server
    const [answers,setAnswers]=useState(null)
    //state to hold the answers done by user
    const [ansDone,setAnsDone]=useState(null)
    //state to hold the clock time
    const [timer,setTimer] = useState(null)
    const [timerActive,setTimerActive] = useState(false)  
    //state to hold the full  screen state  
    const [fullscreen,setFullscreen]=useState(false)

    //state for the modal instructions
    const [modalInstructions,setModalInstructions]=useState(true)
    const handleClose = () => setModalInstructions(false);
    const handleShow = () => setModalInstructions(true);

    //state for the modal instructions
    const  [message,setMessage] = useState(null)
    const [modalMessage,setModalMessage]=useState(false)
    const handleCloseMessage = () => setModalMessage(false);
    const handleShowMessage = () => setModalMessage(true);
    

    // variable holding the full screen trigger
    const screen1 = useFullScreenHandle();

    // callback function from the react-fullscreen package
    const reportChange = useCallback((state, handle) => {
        if (handle === screen1) {
          console.log('Screen 1 went to', state)
          //handle is a function holding the active state , enter & exit function
          console.log("handle ",handle)
          //set the if condition here for the violation handle2
          if(fullscreen ===true &&state===false){
            //fullscreen is our handle... set at start and the end
            //state is the current state held by the full screen component
            console.log("violation due to exit full screen before the quiz ends")
            //submit for violation
            violationSubmit()
          }
        }
      }, [screen1]);

    const fullscreenFunc=(value)=>{
        if(value==="enter"){
          //fullscreen flag is set to true
          setFullscreen(true)
          screen1.enter() 
        }
        if(value==="exit"){
          //fullscreen flag is set to false
          setFullscreen(false)
          screen1.exit()
        }
    }

    //function for the timer countdown
    useEffect(()=>{
        if(timerActive){
            timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
            if(timer===0){
                timeoutTrigger()
            }
        }  
      },[timer,timerActive])
    //function for the timeout trigger
    const timeoutTrigger=()=>{
        setTimerActive(false)
        // alert("timeout... saving progress")
        submitTimeout()
    }

    //function to fetch the quiz data on startup
    useEffect(()=>{
        // axios 
        let formData = {ID:quizID};    
        // console.log(quizID);
        //header configuration for the CORS
        const config  = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin':'*'
                }}
        axios.post('https://quizzlerserver.herokuapp.com/fetchQuiz', 
        QueryString.stringify(formData),config)
        .then(function (response) {
            // console.log(response.data);
            if(response.data !=="Error"){
                setQuizData(response.data)
                // console.log(response.data)
                // console.log(response.data.time)
                setTimer(response.data.time *60)

                let ansScrapper=[]
                let dummyfill=[]
                for(var i=0;i<response.data.questions.length;i++){
                    ansScrapper.push(response.data.questions[i].answer);
                    // console.log(ansScrapper);
                    dummyfill.push(-1)
                }
                setAnsDone(dummyfill)
                setAnswers(ansScrapper)
            }else{
                alert("Cannot fetch the data from the Server... Error!! Refresh again.")
            }
        })
        .catch(function (error) {
            alert("Error!! Check your Network and Try again.")
        });

        //axios post to initially set the quiztaken to opened
         // axios 
         let formDatas = {QID:quizID,UID:uid,UName:uname,Status:"opened",Score:0};    
         // console.log(QueryString.stringify(formData));  
                 axios.post('https://quizzlerserver.herokuapp.com/submitInitial', 
                 QueryString.stringify(formDatas),config)
                 .then(function (response) {
                    if(response.data==="Error"){
                        alert("something went wrong. Try agin.. If you cant take the quiz again, contact the creator or our Dev team")
                    }
                    else{
                        if(response.data==="Already Taken!"){
                            setMessage(response.data)
                            handleShowMessage()
                        }
                    }                        
                 })
                 .catch(function (error) {
                     alert("Connection lost.. Refresh")
                 });
    },[])

    //function to validate the quiz--normal submit
    const submitQuizDataHandler=(event)=>{
        event.preventDefault();
        let flagSubmit=0;
        for(var i=0;i<ansDone.length;i++){
            if(ansDone[i]===-1){
                alert("You forgot to Answer Question No:"+(i+1)+". Please Answer all the questions to proceed");
                flagSubmit=1;
                break;
            }
        }
        if(flagSubmit===0){
            fullscreenFunc("exit")
            let scoreObtained=0;
            for(var i=0;i<ansDone.length;i++){
                if(ansDone[i]===answers[i]){
                    scoreObtained=scoreObtained+1
                }
            }
            // alert("submitting");
            // fullscreenFunc("exit")
            //check for the fullscreen is still turned on...
            // forward to respective submit handlers
            
            //create the axios here
             // axios 
             let formData = {QID:quizID,UID:uid,UName:uname,Status:"completed",Score:scoreObtained};    
             // console.log(QueryString.stringify(formData));  
             //header configuration for the CORS
            const config  = {
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin':'*'
            }}
            axios.post('https://quizzlerserver.herokuapp.com/submitUpdate', 
            QueryString.stringify(formData),config)
            .then(function (response) {
               //create a modal to show the message from server
                setMessage(response.data)
                handleShowMessage()
            })
            .catch(function (error) {
                alert("You have violated the terms. refresh to continue")
            });
            }
    }

    //function violation submit
    const violationSubmit=()=>{
        //submit data on terms of the violation
         // axios 
         let formData = {QID:quizID,UID:uid,UName:uname,Status:"violation",Score:0};    
         // console.log(QueryString.stringify(formData));  
         //header configuration for the CORS
        const config  = {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin':'*'
        }}
        axios.post('https://quizzlerserver.herokuapp.com/submitUpdate', 
        QueryString.stringify(formData),config)
        .then(function (response) {
           //display the violation message and move to dashboard
           //create a modal to show the violation message
           setMessage(response.data)
           handleShowMessage()
        })
        .catch(function (error) {
            alert("You have violated the terms. refresh to continue")
        });
    }
    //function for the clock timeout submit
    const submitTimeout = ()=>{
        
        let scoreObtained=0
        for(var i=0;i<ansDone.length;i++){
            if(ansDone[i]===answers[i]){
                scoreObtained=scoreObtained+1
            }
        }
        // axios 
        let formData = {QID:quizID,UID:uid,UName:uname,Status:"completed",Score:scoreObtained};    
        // console.log(QueryString.stringify(formData));  
        //header configuration for the CORS
        const config  = {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin':'*'
        }}
        axios.post('https://quizzlerserver.herokuapp.com/submitUpdate', 
        QueryString.stringify(formData),config)
        .then(function (response) {
           //create a modal to show the message from server
            setMessage(response.data)
            handleShowMessage()
        })
        .catch(function (error) {
            alert("You have violated the terms. refresh to continue")
        });
        fullscreenFunc("exit")
    }

    return(
        <FullScreen handle={screen1} onChange={reportChange}>
        
      
        <div className="fullscreen-overflow-scroll">
            <div className="quizzler-background-quiztime"></div>

            {/* timer component */}
            <div className="card timer-custom px-2 pt-2">
                <p className="text-secondary m-0">Time left:</p>
                <span className="text-center">
                    <Clock time={timer}/>
                </span>                                                                    
            </div>
            {/* maximise to full screen .. */}
            {/* populate all the quiz data here using the useEffect */}
            
            <div className="container p-4 ">
                {/* quiz details card */}
                <div className="card p-4 my-4 question-component text-center border-warning">
                    <h5 className="text-primary">{quizData?quizData.name:null}</h5>
                    <p className="text-secondary">{quizData?quizData.relatedTo:null}</p>                    
                </div>

                <form>                
                {quizData && quizData.questions.map((entry,index)=>{
                    return(
                        <div className="card p-4  my-4 question-component" key={entry.No}>                            
                                <h5 className="text-secondary">{index+1+") "}{entry.question}</h5>
                                <div className="text-center my-3">
                                    {entry.QImageLink!==""?<img className="question-compoment-image center" src={entry.QImageLink} alt="question reference image"/>:null}                                    
                                </div>

                                <div 
                                    onChange={(e)=>{
                                        var tempAns=ansDone
                                        tempAns[index]=e.target.value
                                        setAnsDone(tempAns)
                                        console.log(ansDone)
                                    }} 
                                    className="p-2">
                                    <div className="form-check my-2">
                                        <input className="form-check-input" name={"question"+index} type="radio" id={"q"+index+"-o1"} value="1"/>
                                        <label className="form-check-label h5" htmlFor={"q"+index+"-o1"}>
                                            {entry.option1}
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input className="form-check-input" name={"question"+index} type="radio" id={"q"+index+"-o2"} value="2" />
                                        <label className="form-check-label h5" htmlFor={"q"+index+"-o2"}>
                                        {entry.option2}
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input className="form-check-input" name={"question"+index} type="radio" id={"q"+index+"-o3"} value="3" />
                                        <label className="form-check-label h5" htmlFor={"q"+index+"-o3"}>
                                        {entry.option3}
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input className="form-check-input" name={"question"+index} type="radio" id={"q"+index+"-o4"} value="4" />
                                        <label className="form-check-label h5" htmlFor={"q"+index+"-o4"}>
                                        {entry.option4}
                                        </label>
                                    </div>
                                </div>               
                        </div>
                    )
                })}
                <div className="card question-component">
                    <button 
                        className="btn btn-block btn-primary"
                        onClick={(e)=>{
                            submitQuizDataHandler(e)
                        }}
                        >SUBMIT</button>
                </div>
                </form>
            </div>




        {/* modal for the instructions */}
            <Modal
            show={modalInstructions}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
            >
            <Modal.Body>
                <h4 className="text-danger my-4 text-center">Read the Conditions Carefully</h4>
                <hr/>
                <ul>
                  <li className="text-secondary my-2">Make sure you have a proper internet connection.</li>
                  <li className="text-secondary my-2">We won't monitor you, We have asked the help of your device to do the heavy lifing for us.</li>
                  <li className="text-secondary my-2">Dont answer any Calls while taking the quiz.</li>
                  <li className="text-secondary my-2">Dont try to switch between Applications while taking the quiz.</li>
                  <li className="text-secondary my-2">Taking part in any malpractice will lead to disqualification.</li>
                  <li className="text-secondary my-2">You can take a Quiz only once. So use it wisely.</li>
                  <li className="text-secondary my-2">You have already entered the Quiz, even if you quit from here It is considered as attended.</li>
                </ul>
                <button 
                    className="btn btn-block btn-primary" 
                    type="button"
                    onClick={()=>{
                        handleClose()
                        setTimerActive(true)
                        fullscreenFunc("enter")
                    }}
                    >AGREE</button>
            </Modal.Body>
        </Modal>

        {/* modal for the message display messages */}
        <Modal
            show={modalMessage}
            onHide={handleCloseMessage}
            backdrop="static"
            keyboard={false}
            centered
            >
            <Modal.Header>
            <Modal.Title>Quizzler</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
                <hr/>
                <button 
                    className="btn btn-block btn-primary"
                    onClick={()=>{
                        redirect("/ul/"+uid+"/"+uname);
                    }}
                    >Go to Dashboard</button>
            </Modal.Body>
        </Modal>
        </div>
        </FullScreen>
    )
}

export default React.memo(Quizzler)