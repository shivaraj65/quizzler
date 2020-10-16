import React,{useState} from 'react'
import Navbar from './navbar/navbarLanding'
import axios from 'axios'
import * as QueryString from "query-string"

import './creatorLobby.css'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


const CreatorLobby=()=>{

    //states for storage of the create quiz data
    const [createName,setCreateName]=useState("")
    const [createRelatedTo,setCreateRelatedTo]=useState("")
    const [createNoOfQuestions,setCreateNoOfQuestions]=useState("")
    const [createTime,setCreateTime]=useState("")
    const [createPrivate,setCreatePrivate]=useState(false)
    const [createQuestions,setCreateQuestions]=useState(null)

    //states for storage of the delete quiz data
    const [deleteQuizID, setDeleteQuizID] = useState("")

    //states for storage of the info global data
    const [infoGlobalQuizID,setInfoGlobalQuiID]= useState("")


    // states and function for the create modal-1 show or hide
    const [createQuizPopup, setCreateQuizPopup] = useState(false)
        //state to switch the modal content
    const [createSwitchContent,setCreateSwitchContent]=useState(1)
    const handleCreatePopupShow= () => setCreateQuizPopup(true)
    const handleCreatePopupClose= () =>{
        setCreateQuizPopup(false)
        // resetting all the fields to empty
        setCreateName("")
        setCreateRelatedTo("")
        setCreateNoOfQuestions("")
        setCreatePrivate("")
        setCreateTime("")
        setCreatePrivate("")
        //setting the modal screen back to the first page
        setCreateSwitchContent(1)
    } 
    
    // states and functions for the delete quiz modal show or hide
    const [deleteQuizPopup,setDeleteQuizPopup]=useState(false)
        //states to toggle the modal content
        const handleDeletePopupShow=()=> setDeleteQuizPopup(true)
        const handleDeletePopupClose=()=> setDeleteQuizPopup(false)

    //states and functions for the info global modal show or hide
    const [infoQuizGlobalPopup,setInfoGlobalPopup]=useState(false)
        //states to toggle the modal content
        const handleInfoGlobalPopupShow=()=>setInfoGlobalPopup(true)
        const handleInfoGlobalPopupClose=()=>setInfoGlobalPopup(false)


//states for the result show modal dialogues...
    
    //states and functions for the info modal show or hide
    const [infoQuizPopup,setInfoPopup]=useState(false)
        //states to toggle the modal content
        const handleInfoPopupShow=()=>setInfoPopup(true)
        const handleInfoPopupClose=()=>setInfoPopup(false)




    //function to validate the first create screen.. to proceed to the second screen
    const validateCreateScreen1=(event)=>{
        event.preventDefault();
        if(createName !=="" && createRelatedTo !== "" && createNoOfQuestions !== "" && createTime !==""){
            // console.log("all set to screen-2")
            let arraydata=[]
            for(let i=0;i<createNoOfQuestions;i++){
                arraydata.push({
                    No:i+1,
                    question:"",
                    QImageLink:"",
                    option1:"",
                    option2:"",
                    option3:"",
                    option4:"",
                    answer:""
                })
            }
            // console.log(arraydata)
            setCreateQuestions(arraydata)
            setCreateSwitchContent(2)
        }else{
            alert("Fill all the Fields First !!")
        }
    }

    //function for the create quiz submit
    const submitCreate=()=>{
        // axios 
        let formData = {CreatorID:"warfreak",QuizName:createName,QuizRelatedTo:createRelatedTo,QuizNOofQuestions:createNoOfQuestions,Time:createTime,Private:createPrivate,Questions:createQuestions};    
        // console.log(QueryString.stringify(formData));  
        //header configuration for the CORS
        const config  = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin':'*'
                }}
        axios.post('http://localhost:3001/createQuiz', 
        QueryString.stringify(formData),config)
        .then(function (response) {
            alert(response)
        })
        .catch(function (error) {
            alert("Check your Network Connection and try agin.")
        });


    }

    //function for the delete Quiz submit
    const submitDeleteQuiz=()=>{
        // axios 
        let formData = {CreatorID:"warfreak",QuizID:deleteQuizID};    
        // console.log(QueryString.stringify(formData));  
        //header configuration for the CORS
        const config  = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin':'*'
                }}
                axios.post('http://localhost:3001/createQuiz', 
                QueryString.stringify(formData),config)
                .then(function (response) {
                    alert(response)
                })
                .catch(function (error) {
                    alert("Check your Network Connection and try agin.")
                });
    }


    return(
        <div className="creatorlobby-bg pb-4">
            <Navbar/>
            <div className="container nav-padding">
                <div className="row">
                    <div className="col-md-7 card mx-2">
                        <table className="data-table table table-light table-borderless table-striped mt-4">
                            <tbody>
                                <tr >
                                    <td className="text-secondary ">Creator ID</td>
                                    <td className="creator-details text-primary">:  rog281</td>
                                </tr>
                                <tr>
                                    <td className="text-secondary">Name</td>
                                    <td className="creator-details text-primary">: Warfreak</td>
                                </tr>
                                <tr>
                                    <td className="text-secondary">Email</td>
                                    <td className="creator-details text-primary">:  atomifystudios@gmail.com</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-4 card bg-light ml-auto mx-2 ">
                        <div className="">
                            <button 
                                className="btn btn-block btn-success mt-3"
                                onClick={handleCreatePopupShow}
                            >CREATE QUIZ</button>
                            <button 
                                className="btn btn-block btn-danger"
                                onClick={handleDeletePopupShow}    
                            >REMOVE QUIZ</button>
                            <button 
                                className="btn btn-block btn-info mb-2"
                                onClick={handleInfoGlobalPopupShow}
                            >GET QUIZ INFO</button>
                        </div>
                    </div>
                </div>
                <hr className="divider primary my-4"/>
                <h4 className="text-center text-dark pb-2">Hosted Quiz Details</h4>
                <div className="card mt-4 py-4 px-4 table-overflow">
                    <table  className="table-bordered table table-hover table-striped table-light ">
                        <tbody className="table-overflow">
                            <tr>
                                <td className="text-secondary">S.No</td>
                                <td className="text-secondary">Quiz ID</td>
                                <td className="text-secondary">Quiz Name</td>
                                <td className="text-secondary">Type</td>
                                <td className="text-secondary">Questions</td>
                                <td className="text-secondary text-center">Details</td>
                                <td  className="text-secondary text-center">Remove</td>
                            </tr>
                            <tr>
                                <td className="text-dark">1</td>
                                <td className="text-primary">39239</td>
                                <td className="text-primary">kkefbk</td>
                                <td className="text-primary">private</td>
                                <td className="text-primary">20</td>
                                <td><button className="btn btn-block btn-info">INFO</button></td>
                                <td className="text-center"><button className="btn btn-block btn-danger">Trash</button></td>
                            </tr>
                            <tr>
                                <td className="text-dark">1</td>
                                <td className="text-primary">39239</td>
                                <td className="text-primary">kkefbk</td>
                                <td className="text-primary">private</td>
                                <td className="text-primary">20</td>
                                <td><button className="btn btn-block btn-info">INFO</button></td>
                                <td className="text-center"><button className="btn btn-block btn-danger">Trash</button></td>
                            </tr>
                            <tr>
                                <td className="text-dark">1</td>
                                <td className="text-primary">39239</td>
                                <td className="text-primary">kkefbk</td>
                                <td className="text-primary">private</td>
                                <td className="text-primary">20</td>
                                <td><button className="btn btn-block btn-info">INFO</button></td>
                                <td className="text-center"><button className="btn btn-block btn-danger">Trash</button></td>
                            </tr>
                            <tr>
                                <td className="text-dark">1</td>
                                <td className="text-primary">39239</td>
                                <td className="text-primary">kkefbk</td>
                                <td className="text-primary">private</td>
                                <td className="text-primary">20</td>
                                <td><button className="btn btn-block btn-info">INFO</button></td>
                                <td className="text-center"><button className="btn btn-block btn-danger">Trash</button></td>
                            </tr>
                            <tr>
                                <td className="text-dark">1</td>
                                <td className="text-primary">39239</td>
                                <td className="text-primary">kkefbk</td>
                                <td className="text-primary">private</td>
                                <td className="text-primary">20</td>
                                <td><button className="btn btn-block btn-info">INFO</button></td>
                                <td className="text-center"><button className="btn btn-block btn-danger">Trash</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr className="divider primary my-4 "/>
                <p className="text-center text-secondary mt-4">Best viewed on pc and laptops </p>
            </div>


            {/* popup for the create quiz */}
            <Modal
                show={createQuizPopup}
                onHide={handleCreatePopupClose}
                backdrop="static"
                size="lg"
                keyboard={false}
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title><span className="text-primary">Create Quiz</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* form to get the initial quiz details */}
                {/* screen-1 */}
                {createSwitchContent===1?
                <div className="text-centered m-auto">
                    <form>
                        <div className="row mb-3">
                            <div className="col">
                                <input 
                                    type="text" 
                                    className="form-control text-primary" 
                                    value={createName}
                                    required
                                    onChange={(e)=>{
                                       setCreateName(e.target.value)
                                    }}
                                    placeholder="Quiz Name"/>
                            </div>
                            <div className="col">
                            <input 
                                type="text" 
                                className="form-control text-primary" 
                                value={createRelatedTo}
                                required
                                onChange={(e)=>{
                                        setCreateRelatedTo(e.target.value)
                                    }}
                                placeholder="Related to"/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <input 
                                    type="number" 
                                    className="form-control text-primary" 
                                    value={createNoOfQuestions}
                                    required
                                    onChange={(e)=>{
                                        setCreateNoOfQuestions(e.target.value)
                                    }}
                                    placeholder="No of Questions"/>
                            </div>
                            <div className="col">
                                <input 
                                    type="number" 
                                    className="form-control text-primary" 
                                    value={createTime}
                                    required
                                    onChange={(e)=>{
                                       setCreateTime(e.target.value)
                                    }}
                                    placeholder="Time allotted in minutes"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="checkbox"
                                onChange={(e)=>{
                                    if(createPrivate===false){
                                        setCreatePrivate(true)
                                    }else{
                                        setCreatePrivate(false)
                                    }
                                }}
                                id="gridCheck"/>
                            <label className="form-check-label text-secondary" htmlFor="gridCheck">
                                Make the Quiz private
                            </label>
                            </div>
                        </div>
                        <hr/>
                        <button 
                            onClick={validateCreateScreen1}
                            className="btn btn-success ml-auto"
                            >Next</button>
                    </form>
                </div>:null}
                {createSwitchContent===2?
                <div>
                    <form>
                    {createQuestions && createQuestions.map((entry,index)=>{
                    return(
                        <div key={index}>
                            <div className="form-group">
                                <label htmlFor="formGroupExampleInput" className="text-primary">Question {index+1}</label>
                                <input 
                                    type="text" 
                                    value={createQuestions[index].question}
                                    onChange={(e)=>{
                                        let payload=[...createQuestions]
                                        payload[index].question=e.target.value
                                        setCreateQuestions(payload)
                                    }}
                                    className="form-control text-dark" 
                                    placeholder="Enter the Question here"/>
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    value={createQuestions[index].QImageLink}
                                    onChange={(e)=>{
                                        let payload=[...createQuestions]
                                        payload[index].QImageLink=e.target.value
                                        setCreateQuestions(payload)
                                    }}
                                    className="form-control text-info" 
                                    placeholder="optional:- link to load the image question"/>
                            </div>
                            <div className="row">
                                <div className="form-group col">
                                    <input 
                                        type="text" 
                                        value={createQuestions[index].option1}
                                        onChange={(e)=>{
                                            let payload=[...createQuestions]
                                            payload[index].option1=e.target.value
                                            setCreateQuestions(payload)
                                        }}
                                        className="form-control text-secondary" 
                                        placeholder="option-1 value"/>
                                </div>
                                <div className="form-group col">
                                    <input 
                                        type="text" 
                                        value={createQuestions[index].option2}
                                        onChange={(e)=>{
                                            let payload=[...createQuestions]
                                            payload[index].option2=e.target.value
                                            setCreateQuestions(payload)
                                        }}
                                        className="form-control text-secondary" 
                                        placeholder="option-2 value"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col">
                                    <input 
                                        type="text" 
                                        value={createQuestions[index].option3}
                                        onChange={(e)=>{
                                            let payload=[...createQuestions]
                                            payload[index].option3=e.target.value
                                            setCreateQuestions(payload)
                                        }}
                                        className="form-control text-secondary" 
                                        placeholder="option-3 value"/>
                                </div>
                                <div className="form-group col">
                                    <input 
                                        type="text" 
                                        value={createQuestions[index].option4}
                                        onChange={(e)=>{
                                            let payload=[...createQuestions]
                                            payload[index].option4=e.target.value
                                            setCreateQuestions(payload)
                                        }}
                                        className="form-control text-secondary" 
                                        placeholder="option-4 value"/>
                                </div>
                            </div>
                            <select 
                                className="form-control text-success" 
                                value={createQuestions[index].answer}
                                onChange={(e)=>{
                                    let payload=[...createQuestions]
                                    payload[index].answer=e.target.value
                                    setCreateQuestions(payload)
                                    console.log(createQuestions);
                                }}
                                >
                                <option>answer</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                            <hr className="divider my-4" />
                        </div>
                    )
                })}
                    <div className="row">
                        <div className="col-md-6">
                            <button 
                                className="btn btn-block btn-success"
                                onClick={(event)=>{
                                    event.preventDefault();
                                    console.log("sumbit presed")
                                    for(var i=1;i<=createQuestions.length;i++){
                                        if(createQuestions[i-1].question !=="" && createQuestions[i-1].option1 !=="" && createQuestions[i-1].option2 !=="" && createQuestions[i-1].option3 !=="" && createQuestions[i-1].option4 !=="" && createQuestions[i-1].answer !=="" && createQuestions[i-1].answer !=="answer"){
                                            // submit
                                            submitCreate();
                                        }else{
                                            alert("Fill all the fields in the Question "+ i + " to Create the quiz")
                                            break;
                                        }
                                    }
                                }}
                                >Create</button>
                        </div>
                        <div className="col-md-6">
                            <button 
                                className="btn btn-block btn-danger"
                                onClick={()=>{
                                    // resetting all the fields to empty
                                    setCreateName("")
                                    setCreateRelatedTo("")
                                    setCreateNoOfQuestions("")
                                    setCreatePrivate("")
                                    setCreateTime("")
                                    setCreatePrivate("")
                                    //closing the modal
                                    handleCreatePopupClose()
                                    //setting the modal screen back to the first page
                                    setCreateSwitchContent(1)
                                }}
                                >Cancel</button>
                        </div>
                    </div>
                        
                    </form>
                </div>:null}
            </Modal.Body>
        </Modal>

        {/* modal for the delete quiz */}
        <Modal
            show={deleteQuizPopup}
            onHide={handleDeletePopupClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title><span className="text-primary">Delete Quiz</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="row">
                        <div className="col">
                            <label className="text-secondary">Quiz ID</label>
                        </div>
                        <div className="col">
                        <input 
                            type="text" 
                            value={deleteQuizID}
                            onChange={(e)=>{
                                setDeleteQuizID(e.target.value)
                            }}
                            className="form-control text-danger" 
                            placeholder="Quiz ID"/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col">
                        <button 
                            className="btn btn-primary btn-block" 
                            onClick={(event)=>{
                            event.preventDefault();
                            if(deleteQuizID ===""){
                                alert("enter a quiz Id to drop the Quiz.")
                            }else{
                                //submit
                                submitDeleteQuiz();
                            }
                            }}>
                            Trash
                        </button>
                        </div>
                        <div className="col">
                            <button 
                                className="btn btn-secondary btn-block" 
                                onClick={handleDeletePopupClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </form>       
            </Modal.Body>
        </Modal>

        {/* modal for the global info  */}
        <Modal
            show={infoQuizGlobalPopup}
            onHide={handleInfoGlobalPopupClose}
            backdrop="static"
            keyboard={false}
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title><span className="text-primary">Quiz INFO</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col">
                        <label className="text-secondary">Quiz ID</label>
                    </div>
                    <div className="col">
                        <input 
                            type="text" 
                            value={infoGlobalQuizID}
                            onChange={(e)=>{
                                setInfoGlobalQuiID(e.target.value)
                            }}
                            className="form-control text-primary" 
                            placeholder="Quiz ID"/>
                    </div>
                </div>
                <hr/>
                    <div className="row">
                        <div className="col">
                        <button 
                            className="btn btn-primary btn-block" 
                            onClick={(event)=>{
                            event.preventDefault();
                            if(infoGlobalQuizID ===""){
                                alert("enter a quiz Id to get the Quiz info.")
                            }else{
                                //submit
                            }
                            }}>
                            Get Info
                        </button>
                        </div>
                        <div className="col">
                            <button 
                                className="btn btn-secondary btn-block" 
                                onClick={handleInfoGlobalPopupClose}>
                                Close
                            </button>
                        </div>
                    </div>
               
            </Modal.Body>
        </Modal>


        </div>
    )
}
export default React.memo(CreatorLobby)


//modal for the individual info and trash...
//alse the submit function for the individual info and the trash...
//create the submit function for the info global...
