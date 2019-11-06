import React from 'react';

import {NavLink} from 'react-router-dom';
import { MyStore } from '../index';

import userLogo from '../Assets/img/user-avatar.png';
import againstBot from '../Assets/img/play-again-bot.jpg';
import againstHuman from '../Assets/img/play-against-human.png';

class Dashboard extends React.Component
{   
    constructor()
    {
        super();
        let chosen = JSON.parse(localStorage.getItem('user'));
        MyStore.dispatch({
            type:'UPDATE_RESULT',
            win:chosen.user.loginUser.win,
            draw:chosen.user.loginUser.draw,
            lost:chosen.user.loginUser.lost
        });
    }
    render()
    {
        let chosenUser = JSON.parse(localStorage.getItem('user'));
        
        let { onPlayBotMode,onPlayPVPMode } = this.props;
        let { win, draw, lost } = this.props.DashboardReducer;
        return(
            <div className="container mt-5">
                <div className="row">
                    
                    <div className="col-md-3 col-sm-12 m-2 bg-365e46 border-365e46 pt-3 text-white font-20">
                        <div className="text-center">
                            <img src={chosenUser.user.loginUser.avatar || userLogo} className="user-logo" alt="User logo"/>
                        </div>     
                        <hr className="border-light"/>      
                        
                        <table style={{width: '100%'}} cellPadding={0} cellSpacing={0}>
                            <tbody>
                                <tr>
                                    <td className="font-weight-bold align-top" style={{width: '35%'}}>NAME:</td>
                                    <td>{chosenUser.user.loginUser.name}</td>                                
                                </tr>
                                <tr>
                                    <td className="font-weight-bold align-top">EMAIL:</td>
                                    <td className="text-wrap">{chosenUser.user.loginUser.email}</td>                                
                                </tr>
                                <tr>
                                    <td className="font-weight-bold align-top">WIN:</td>
                                    <td>{win}</td>                                
                                </tr>
                                <tr>
                                    <td className="font-weight-bold align-top">DRAW:</td>
                                    <td>{draw}</td>                                
                                </tr>
                                <tr>
                                    <td className="font-weight-bold align-top">LOST:</td>
                                    <td>{lost}</td>                                
                                </tr>
                            </tbody>
                        </table>                             

                        <NavLink to="/user">
                            <button className="btn btn-default mt-3 w-100 text-white font-weight-bold font-25">SEE MORE</button>
                        </NavLink>                        
                    </div>
                    
                    <div className="col-md-4 col-sm-12 m-2 bg-365e46 border-365e46 pt-3 text-white">
                        <div className="card border-0">
                            <img src={againstBot} className="card-img-top" alt="Play against bot"></img>
                            <div className="card-body bg-transparent">
                                <h5 className="card-title">Play against bot !</h5>
                                <p className="card-text">
                                    Your mission is play tic tac toe and have a win against our talent robot ...
                                </p>
                                <NavLink to="/playground">
                                    <button className="btn btn-danger font-weight-bold w-100 text-center text-white" onClick={()=>{onPlayBotMode()}}>PLAY !!!</button>
                                </NavLink>
                            </div>
                        </div>
                        
                    </div>
                   
                    <div className="col-md-4 col-sm-12 m-2 bg-365e46 border-365e46 pt-3 text-white">
                        <div className="card border-0">
                            <img src={againstHuman} className="card-img-top" alt="Play against human"></img>
                            <div className="card-body bg-transparent">
                                <h5 className="card-title">Play versus Player !</h5>
                                <p className="card-text">
                                    Your mission is play tic tac toe and have a win against other player to find out who is the best tic tac toe player ...
                                </p>

                                <NavLink to="/playground">
                                    <button className="btn btn-danger font-weight-bold w-100 text-center text-white" onClick={()=>{onPlayPVPMode()}}>PLAY !!!</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;