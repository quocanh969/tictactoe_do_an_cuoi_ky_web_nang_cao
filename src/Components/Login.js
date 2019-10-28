import React from 'react';
import {NavLink} from 'react-router-dom';

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
            <div style={{paddingTop: '100px', textAlign: 'center'}}>   
                <h3 className="font-weight-bold mb-5">Please login to play TIC TAC TOE game</h3>     
                <div className="cart my-login-cart mx-auto">
                <div className="card-header login-header my-bg">LOGIN</div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="username" className="pr-0 col-3 col-form-label">
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
                            <label className="pr-0 col-3 col-form-label" htmlFor="password">
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
                            <button className="btn btn-warning text-white mx-2 my-bg text-light" type="submit">
                                Login
                            </button>
                            <NavLink to="/menu">
                                <button className="btn btn-default mx2">
                                    Register
                                </button>
                            </NavLink>                
                        </div>              
                    </form>       
                </div>
                </div>
            </div>
        );
    }
}

export default Login;