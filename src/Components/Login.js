import React from 'react';
import {NavLink} from 'react-router-dom';

import login_background from '../Assets/img/login-background.png';

import '../index.css';
class Login extends React.Component
{
    user = {
        username:'',
        password:'',
    }

    constructor(props)
    {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this); // handle submit
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e)
    {
        this.user[e.target.name] = e.target.value;
    }

    handleSubmit(e)
    {
        e.preventDefault();
        
        let { onLogin } = this.props;
        onLogin(this.user);
    }


    generateNotice()
    {
        let { status, message } = this.props.LogInReducer;

        if(status === -1)
        {// Thất bại
            return(
                <div className="alert alert-danger mb-3">
                    {message}
                </div>
            );
        }
    }

    render()
    {
        return(
            <div style={{paddingTop: '100px'}} className="container">   
                <div className="row">
                    <div className="col-md-7 col-sm-12 mt-5">
                        <img className="image-background" src={login_background} alt="Tic Tac Toe Background"></img>
                    </div>
                    <div className="col mt-5">                        
                        <div className="cart my-login-cart mx-auto">
                            <div className="card-header login-header bg-danger text-center border-light">LOGIN</div>
                            <div className="card-body bg-365e46">
                                {this.generateNotice()}
                                <form ref="loginForm" onSubmit={this.handleSubmit}>
                                    <div className="form-group row">
                                        <label htmlFor="username" className="text-white font-weight-bold pr-0 col-3 col-form-label">
                                            Username
                                        </label>
                                        <div className="col-9">
                                            <input 
                                                required
                                                name="username"
                                                type="text" 
                                                className="form-control" 
                                                id="username" 
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="text-white font-weight-bold pr-0 col-3 col-form-label" htmlFor="password">
                                            Password
                                        </label>
                                        <div className="col-9">
                                            <input 
                                                required
                                                name="password"
                                                type="password" 
                                                className="form-control" 
                                                id="password"                                     
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group d-flex justify-content-between mx-1">
                                        <button style={{width:'49%'}} className="btn btn-danger text-white font-weight-bold" type="submit">
                                            Login
                                        </button>
                                        <div style={{width:'49%'}}>
                                            <NavLink to="/register">
                                                <button  className="btn btn-light w-100 font-weight-bold">
                                                    Register
                                                </button>
                                            </NavLink>      
                                        </div>
                                    </div>     

                                    <div className="text-center text-light my-5">
                                        <hr className="border-light"/>
                                        <span>
                                            Or login with
                                        </span>
                                        <hr className="border-light"/>
                                    </div>

                                    <button className="text-white font-weight-bold btn btn-facebook text-center w-100 my-2">
                                        <i className="fab fa-facebook-square mr-3"></i>
                                        <span>Facebook</span>
                                    </button>

                                    <button className="text-white font-weight-bold btn btn-google text-center w-100 my-2">
                                        <i className="fab fa-google mr-3"></i>
                                        <span>Google</span>
                                    </button>
                                </form>       
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;