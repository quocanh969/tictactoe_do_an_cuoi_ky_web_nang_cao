import React from 'react';
import {NavLink} from 'react-router-dom';

import login_background from '../Assets/img/login-background.png';

import '../index.css';
class Login extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            name: '',
            password: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this); // handle submit
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e)
    {
        this.setState({
            [e.target.name]:e.target.value,
        })
    }

    handleSubmit(e)
    {
        e.preventDefault();
        console.log('login: ');
        const {name, password} = this.state;

        if(name && password)
        {
            console.log('User: ');
            console.log({name,password});
        }
    }

    render()
    {
        return(
            <div style={{paddingTop: '100px'}} className="container">   
                <div className="row">
                    <div className="col-7">
                        <img className="image-background" src={login_background} alt="Tic Tac Toe Background"></img>
                    </div>
                    <div className="col">
                        <h4 className="font-weight-bold mb-5">Please login to play TIC TAC TOE game</h4>
                        <div className="cart my-login-cart mx-auto">
                            <div className="card-header login-header bg-365e46">LOGIN</div>
                            <div className="card-body bg-365e46">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group row">
                                        <label htmlFor="username" className="text-white font-weight-bold pr-0 col-3 col-form-label">
                                            Username
                                        </label>
                                        <div className="col-9">
                                            <input 
                                                name="name"
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
                                                name="password"
                                                type="text" 
                                                className="form-control" 
                                                id="password"                                     
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row justify-content-end mr-2">
                                        <button className="btn btn-danger text-white mx-2 text-light" type="submit">
                                            Login
                                        </button>
                                        <NavLink to="/menu">
                                            <button className="btn btn-light mx-2">
                                                Register
                                            </button>
                                        </NavLink>                
                                    </div>              
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