import React from 'react';
import userAvatar from '../Assets/img/user-avatar.png';

class User extends React.Component
{
    render()
    {
        return(
            <div className="container mt-5">
                <div className="row">
                    <div className="col-5 m-2 bg-365e46 border-365e46 py-3 font-weight-bold text-white font-20 text-center">
                        <img src={userAvatar} style={{width:'80%'}} alt="User Avatar"></img>

                        <div className="mt-4">MATH: 30</div>

                        <div className="d-flex justify-content-between mt-4">
                            <div className="p-1 bg-danger border-transparent" style={{width:'30%'}}>
                                WIN
                                <hr className="border-light h-5px"/>                               
                                10
                            </div>                            
                            <div className="p-1 bg-primary border-transparent" style={{width:'30%'}}>
                                DRAW
                                <hr className="border-light h-5px"/>                               
                                10
                            </div>                            
                            <div className="p-1 bg-dark border-transparent" style={{width:'30%'}}>
                                LOST
                                <hr className="border-light h-5px"/>                               
                                10
                            </div>
                        </div>                        
                    </div>

                    <div className="col">
                        <div className="m-2 bg-365e46 border-365e46 pt-1 text-white font-20">
                            <h2 className="text-center font-weight-bold">USER INFO</h2>
                            <form className="m-4">
                                <div className="form-group row">
                                    <label htmlFor="name" className="text-white font-weight-bold pr-0 col-3 col-form-label">
                                        NAME:
                                    </label>
                                    <div className="col-9">
                                        <input 
                                            name="name"
                                            type="text" 
                                            className="form-control" 
                                            id="name" 
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="text-white font-weight-bold pr-0 col-3 col-form-label" htmlFor="email">
                                        EMAIL:   
                                    </label>
                                    <div className="col-9">
                                        <input 
                                            name="email"
                                            type="email" 
                                            className="form-control" 
                                            id="email"                                                                             
                                        />
                                    </div>
                                </div>          

                                <div className="form-group row">
                                    <label className="text-white font-weight-bold pr-0 col-3 col-form-label" htmlFor="age">
                                        AGE:   
                                    </label>
                                    <div className="col-3">
                                        <input 
                                            name="age"
                                            type="number" 
                                            className="form-control"                                            
                                            id="age"
                                            min="1"                                     
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <label className="text-white font-weight-bold pr-0 col-3 col-form-label" htmlFor="gender">
                                        GENDER:   
                                    </label>
                                    <div className="col-3">
                                        <select className="custom-select" name="gender" id="gender">
                                            <option defaultValue>Choose...</option>
                                            <option value={true}>Male</option>
                                            <option value={false}>Female</option>                                        
                                        </select>
                                    </div>
                                </div>  

                                <div className="form-group row">
                                    <label className="text-white font-weight-bold pr-0 col-3 col-form-label" htmlFor="address">
                                        ADDRESS:
                                    </label>
                                    <div className="col-9">
                                        <textarea 
                                            name="address"                                        
                                            className="form-control" 
                                            id="address"                                                                             
                                        />
                                    </div>
                                </div>      

                                <div className="form-group row justify-content-end mr-2">
                                    <button className="btn btn-danger text-white mx-2 text-light font-weight-bold font-20" type="submit">
                                        UPDATE INFO
                                    </button>       
                                </div>                                              
                            </form>    
                        
                        </div>
                        <div className="m-2 bg-365e46 border-365e46 pt-1 text-white font-20">
                            <h2 className="text-center font-weight-bold">ACCOUNT INFO</h2>
                            <form className="m-4">
                                <div className="form-group row">
                                    <label htmlFor="username" className="text-white font-weight-bold pr-0 col-3 col-form-label">
                                        USERNAME:
                                    </label>
                                    <div className="col-9">
                                        <input 
                                            name="username"
                                            type="text" 
                                            className="form-control disabled" 
                                            id="username" 
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="text-white font-weight-bold pr-0 col-3 col-form-label" htmlFor="password">
                                        PASSWORD:   
                                    </label>
                                    <div className="col-9">
                                        <input 
                                            name="password"
                                            type="password" 
                                            className="form-control" 
                                            id="password"          
                                            disabled                                                                   
                                        />
                                    </div>
                                </div>         

                                <div className="form-group row justify-content-end mr-2">
                                    <button className="btn btn-danger text-white mx-2 text-light font-weight-bold font-20" type="submit">
                                        CHANGE PASSWORD
                                    </button>       
                                </div>                                            
                            </form>                            
                        </div>
                    </div>
                </div>    
            </div>
        );
    }
}

export default User;