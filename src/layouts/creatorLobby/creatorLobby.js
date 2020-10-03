import React,{useState} from 'react'
import Navbar from './navbar/navbarLanding'

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
    const [createQuestions,setCreateQuestions]=useState("")



    // states and function for the create modal-1 show or hide
    const [createQuizPopup, setCreateQuizPopup] = useState(false);
    const handleCreatePopupShow= () => setCreateQuizPopup(true);
    const handleCreatePopupClose= () => setCreateQuizPopup(false);
    

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
                            <button className="btn btn-block btn-danger">REMOVE QUIZ</button>
                            <button className="btn btn-block btn-info mb-2">GET QUIZ INFO</button>
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
                                required
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
                            onclick={()=>{

                            }}
                            className="btn btn-success ml-auto"
                            >Next</button>
                    </form>
                </div>
            </Modal.Body>
            {/* <Modal.Footer> */}
            
            {/* <Button variant="danger" onClick={handleCreatePopupClose}>
                Close
            </Button> */}
            {/* </Modal.Footer> */}
        </Modal>
        </div>
    )
}
export default React.memo(CreatorLobby)