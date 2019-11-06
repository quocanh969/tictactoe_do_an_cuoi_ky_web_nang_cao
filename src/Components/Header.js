import React from 'react';
import logo from '../Assets/img/tic-tac-toe-logo.png';
import {NavLink} from 'react-router-dom';
import '../Assets/css/style.css';

class Header extends React.Component
{    

    componentWillMount()
    {
        let user = JSON.parse(localStorage.getItem('user'));
        let { onUpdateStatus } = this.props;
        if(user === null || user.user === false)
        {
            onUpdateStatus(false);
        }
        else
        {
            onUpdateStatus(true);
        }
    }

    logOut()
    {
        let { onLogOut } = this.props;
        onLogOut();
    }

    generateUserOptions()
    {
        let user = JSON.parse(localStorage.getItem('user'));
        if(user !== null && user.user !== false)
        {    
            return(      
                <div className="col row justify-content-end">
                    <div className="mx-0 px-3 font-weight-bold font-25 align-self-center">
                        {user.user.loginUser.name}
                    </div>
                    <div className="btn-group bg-transparent">
                        <button 
                            type="button" 
                            className="btn btn-default text-white font-weight-bold dropdown-toggle"
                            data-toggle="dropdown">                            
                        </button>
                        <div className="dropdown-menu">
                            <NavLink to="/user">
                                <button className="btn btn-default">Personal Info</button>
                            </NavLink>
                            <div className="dropdown-divider"></div>
                            <NavLink to="/login">
                                <button className="btn btn-default" onClick={()=>{this.logOut()}}>
                                    Log Out
                                </button>
                            </NavLink>
                        </div>
                    </div>     
                </div>                         
            );
        }
        else
        {
            return(                
                <div className="col row align-items-center ml-3">
                    <NavLink to="/login">
                        <div className="mx-0 px-3 font-weight-bold text-white">
                            LOGIN
                        </div>
                    </NavLink>
                    <NavLink to="/register">
                        <div className="mx-0 px-3 font-weight-bold text-white">
                            REGISTER
                        </div>
                    </NavLink>
                </div>                
            );
        }
    }

    render()
    {    
        return(
            <div className="container-fluid bg-365e46 py-3">
                <div className="container text-white">
                    <div className="row">
                        <div className="col-md-9 col-sm-7 font-weight-bold border-right border-light">
                            <NavLink to="/dashboard">
                                <img className="logo cursor-pointer" src={logo} alt="logo"></img>
                            </NavLink>
                        </div>   
                        {this.generateUserOptions()}   
                    </div>
                </div>
            </div>    
        );
    }
}

export default Header;