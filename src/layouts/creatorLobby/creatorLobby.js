import React,{useState} from 'react'
import Navbar from './navbar/navbarLanding'

import './creatorLobby.css'

const CreatorLobby=()=>{
    return(
        <div className="bg-primary-custom-2">
            <Navbar/>
            <div className="container nav-padding">
                <div className="row">
                    <div className="col-md-8 table">
                        <table className="data-table table table-hovered table-striped ">
                            <tbody>
                                <tr >
                                    <td className="text-secondary">Creator ID</td>
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
                                {/* <tr>
                                    <td className="text-secondary">Authenticated</td>
                                    <td className="creator-details text-primary">:  TRUE</td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-4">
                        <div className="margin">
                            <button className="btn btn-block btn-success">CREATE QUIZ</button>
                            <button className="btn btn-block btn-danger">REMOVE QUIZ</button>
                            <button className="btn btn-block btn-info">GET QUIZ INFO</button>
                        </div>
                    </div>
                </div>
                <hr className="divider primary my-4"/>
                <h4 className="text-center text-secondary pb-2">Hosted Quiz Details</h4>
                <div className="table">
                    <table  className="data-table table table-hovered table-striped">
                        <tbody>
                            <tr>
                                <td className="text-secondary">S.No</td>
                                <td className="text-secondary">Quiz ID</td>
                                <td className="text-secondary">Quiz Name</td>
                                <td className="text-secondary">Type</td>
                                <td className="text-secondary">No.of.Questions</td>
                                <td className="text-secondary">Details</td>
                            </tr>
                            <tr>
                                <td className="text-dark">1</td>
                                <td className="text-primary">39239</td>
                                <td className="text-primary">kkefbk</td>
                                <td className="text-primary">private</td>
                                <td className="text-primary">20</td>
                                <td><button className="btn btn-block btn-info">INFO</button></td>
                            </tr>
                            <tr>
                                <td className="text-dark">1</td>
                                <td className="text-primary">39239</td>
                                <td className="text-primary">kkefbk</td>
                                <td className="text-primary">private</td>
                                <td className="text-primary">20</td>
                                <td><button className="btn btn-block btn-info">INFO</button></td>
                            </tr>
                            <tr>
                                <td className="text-dark">1</td>
                                <td className="text-primary">39239</td>
                                <td className="text-primary">kkefbk</td>
                                <td className="text-primary">private</td>
                                <td className="text-primary">20</td>
                                <td><button className="btn btn-block btn-info">INFO</button></td>
                            </tr>
                            <tr>
                                <td className="text-dark">1</td>
                                <td className="text-primary">39239</td>
                                <td className="text-primary">kkefbk</td>
                                <td className="text-primary">private</td>
                                <td className="text-primary">20</td>
                                <td><button className="btn btn-block btn-info">INFO</button></td>
                            </tr>
                            <tr>
                                <td className="text-dark">1</td>
                                <td className="text-primary">39239</td>
                                <td className="text-primary">kkefbk</td>
                                <td className="text-primary">private</td>
                                <td className="text-primary">20</td>
                                <td><button className="btn btn-block btn-info">INFO</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                
            </div>
        </div>
    )
}
export default React.memo(CreatorLobby)