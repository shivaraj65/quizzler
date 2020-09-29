import React,{useState} from 'react'
import Navbar from './navbar/navbarLanding'

import './creatorLobby.css'

const CreatorLobby=()=>{
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
                            <button className="btn btn-block btn-success mt-3">CREATE QUIZ</button>
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
        </div>
    )
}
export default React.memo(CreatorLobby)