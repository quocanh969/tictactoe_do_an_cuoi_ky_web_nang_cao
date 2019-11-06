import React from 'react';
import Popup from "reactjs-popup";
import userAvatar from '../Assets/img/user-avatar.png';

import { storage } from '../Helpers/Firebase';

class User extends React.Component {
    chosenUser = JSON.parse(localStorage.getItem('user'));
    image = null;

    newPass = {
        oldPassword: '',
        newPassword: '',
        confirm: '',
    }

    constructor() {
        super();

        this.handleUserInfoChange = this.handleUserInfoChange.bind(this);
        this.handleUserInfoSubmit = this.handleUserInfoSubmit.bind(this);

        this.handleAccountInfoChange = this.handleAccountInfoChange.bind(this);
        this.handleAccountInfoSubmit = this.handleAccountInfoSubmit.bind(this);

        this.handleAvatarChange = this.handleAvatarChange.bind(this);
    }

    componentWillMount() {        
        let url = this.chosenUser.user.loginUser.avatar;
        if(url !== null)
        {
            this.props.onChangeAvatar(this.chosenUser.user.loginUser.id,url,false);
        }
        else
        {  
            this.props.onChangeAvatar(this.chosenUser.user.loginUser.id,'',false);          
        }
        
        this.props.onResetUpdateInfoStatus();   
    }

    handleUserInfoChange(e) {
        this.chosenUser.user.loginUser[e.target.name] = e.target.value;
    }

    handleUserInfoSubmit(e) {
        e.preventDefault();

        let { onUpdateUser } = this.props;
        let id = JSON.parse(localStorage.getItem('user')).user.loginUser.id;
        onUpdateUser(
            id,
            {
                name: this.chosenUser.user.loginUser.name,
                email: this.chosenUser.user.loginUser.email,
                gender: this.chosenUser.user.loginUser.gender,
                yob: this.chosenUser.user.loginUser.yob,
                address: this.chosenUser.user.loginUser.address
            });

        localStorage.setItem('user', JSON.stringify(this.chosenUser));
    }

    handleAccountInfoChange(e)
    {
        this.newPass[e.target.name] = e.target.value;
    }

    handleAvatarChange(e)
    {
        this.image = e.target.files[0];
        const uploadTask = storage.ref(`images/${this.image.name}`).put(this.image);

        uploadTask.on('state_changed',
        ()=>{},
        (error)=>{
            alert('Upload image to server host get error ...');
        },
        ()=>{ // hoàn thành việc upload
            storage.ref('images').child(this.image.name).getDownloadURL()
            .then(
                (url)=>{   
                    this.chosenUser.user.loginUser.avatar = url;                 
                    this.props.onChangeAvatar(this.chosenUser.user.loginUser.id,url,true);

                    localStorage.setItem('user',JSON.stringify(this.chosenUser));
                }
            )
        })
    }

    handleAccountInfoSubmit()
    {     
        let { onChangePassword, onNoticeChangePasswordFail } = this.props;
        let user = JSON.parse(localStorage.getItem('user'));

        if(this.newPass.oldPassword !== user.user.loginUser.password)
        {
            onNoticeChangePasswordFail('Your password is wrong');
        }
        else if(this.newPass.newPassword === this.newPass.oldPassword)
        {
            onNoticeChangePasswordFail('New password is the same as old');            
        }
        else if(this.newPass.newPassword !== this.newPass.confirm)
        {
            onNoticeChangePasswordFail('The new password confirm is not same');            
        }
        else
        {
            user.user.loginUser.password = this.newPass.newPassword;
            onChangePassword(user.user.loginUser.id,this.newPass.newPassword);
            
            localStorage.setItem('user', JSON.stringify(user));
        }        
    }

    generateNotice() {
        let { status, message } = this.props.UserReducer;

        if (status === 0) {
            return null;
        }
        else if (status === 1) {// Thành công
            return (
                <div className="alert alert-success mb-3">
                    {message}
                </div>
            );
        }
        else {// Thất bại
            return (
                <div className="alert alert-danger mb-3">
                    {message}
                </div>
            );
        }
    }

    generateChangePasswordNotice() {
        let { changePassSta, changePassMess } = this.props.UserReducer;

        if (changePassSta === 0) {
            return null;
        }
        else if (changePassSta === 1) {// Thành công
            return (
                <div className="alert alert-success mb-3">
                    {changePassMess}
                </div>
            );
        }
        else {// Thất bại
            return (
                <div className="alert alert-danger mb-3">
                    {changePassMess}
                </div>
            );
        }
    }

    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-5 col-sm-12 m-2 bg-365e46 border-365e46 py-3 font-weight-bold text-white font-20 text-center">
                        <img src={this.props.UserReducer.url || userAvatar} style={{ width: '80%' }} alt="User Avatar"></img>

                        
                        <div className="my-2">
                            <input ref="fileInput" type="file" className="custom-file-input d-none"
                                    onChange={this.handleAvatarChange}
                            ></input>
                            <button className="btn btn-light" onClick={()=>{this.refs.fileInput.click()}}>
                                <i className="fa fa-camera"></i>
                                &nbsp;| Upload image to change avatar
                            </button>
                        </div>

                        <div className="mt-4">PVP MATCH: {this.chosenUser.user.loginUser.win + this.chosenUser.user.loginUser.draw + this.chosenUser.user.loginUser.lost}</div>

                        <div className="d-flex justify-content-between mt-4">
                            <div className="p-1 bg-danger border-transparent" style={{ width: '30%' }}>
                                WIN
                                <hr className="border-light h-5px" />
                                {this.chosenUser.user.loginUser.win}
                            </div>
                            <div className="p-1 bg-primary border-transparent" style={{ width: '30%' }}>
                                DRAW
                                <hr className="border-light h-5px" />
                                {this.chosenUser.user.loginUser.draw}
                            </div>
                            <div className="p-1 bg-dark border-transparent" style={{ width: '30%' }}>
                                LOST
                                <hr className="border-light h-5px" />
                                {this.chosenUser.user.loginUser.lost}
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="m-2 bg-365e46 border-365e46 pt-1 text-white font-20">
                            <h2 className="text-center font-weight-bold">USER INFO</h2>
                            <form id="changeInfoForm" className="m-4" onSubmit={this.handleUserInfoSubmit}>
                                {this.generateNotice()}
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
                                            defaultValue={this.chosenUser.user.loginUser.name}
                                            onChange={this.handleUserInfoChange}
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
                                            defaultValue={this.chosenUser.user.loginUser.email}
                                            onChange={this.handleUserInfoChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row align-items-center">
                                    <label className="text-white font-weight-bold pr-0 col-3 col-form-label" htmlFor="age">
                                        YEAR OF BIRTH:
                                    </label>
                                    <div className="col-3">
                                        <input
                                            name="yob"
                                            type="number"
                                            className="form-control"
                                            id="yob"
                                            min="1"
                                            defaultValue={this.chosenUser.user.loginUser.yob}
                                            onChange={this.handleUserInfoChange}
                                        />
                                    </div>
                                    <label className="text-white font-weight-bold pr-0 col-3 col-form-label" htmlFor="gender">
                                        GENDER:
                                    </label>
                                    <div className="col-3">
                                        <select className="custom-select" name="gender" id="gender" defaultValue={this.chosenUser.user.loginUser.gender} onChange={this.handleUserInfoChange}>
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
                                            defaultValue={this.chosenUser.user.loginUser.address}
                                            onChange={this.handleUserInfoChange}
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
                                            defaultValue={this.chosenUser.user.loginUser.username}
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
                                            defaultValue={this.chosenUser.user.loginUser.password}
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="form-group row justify-content-end mr-2">

                                    <Popup modal trigger={
                                        <button type="button" className="btn btn-danger text-white mx-2 text-light font-weight-bold font-20">
                                            CHANGE PASSWORD
                                        </button>
                                    }>
                                        {close => (                                            
                                            <div className="m-3 bg-365e46 border-365e46 pt-1 text-white font-20">
                                                <h2 className="text-center font-weight-bold">CHANGE PASSWORD</h2>
                                                {this.generateChangePasswordNotice()}
                                                <div id="changePassForm" className="m-4">
                                                    <div className="form-group row">
                                                        <label htmlFor="username" className="text-white font-weight-bold pr-0 col-5 col-form-label">
                                                            USERNAME:
                                                        </label>
                                                        <div className="col-7">
                                                            <input
                                                                name="username"
                                                                type="text"
                                                                className="form-control disabled"
                                                                id="username"
                                                                defaultValue={this.chosenUser.user.loginUser.username}
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group row">
                                                        <label className="text-white font-weight-bold pr-0 col-5 col-form-label" htmlFor="password">
                                                            PASSWORD:
                                                    </label>
                                                        <div className="col-7">
                                                            <input
                                                                name="oldPassword"
                                                                type="password"
                                                                className="form-control"
                                                                id="oldPassword"
                                                                onChange={this.handleAccountInfoChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group row">
                                                        <label className="text-white font-weight-bold pr-0 col-5 col-form-label" htmlFor="password">
                                                            NEW PASSWORD:
                                                    </label>
                                                        <div className="col-7">
                                                            <input
                                                                name="newPassword"
                                                                type="password"
                                                                className="form-control"
                                                                id="newPassword"
                                                                onChange={this.handleAccountInfoChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group row">
                                                        <label className="text-white font-weight-bold pr-0 col-5 col-form-label" htmlFor="password">
                                                            CONFIRM PASSWORD:
                                                    </label>
                                                        <div className="col-7">
                                                            <input
                                                                name="confirm"
                                                                type="password"
                                                                className="form-control"
                                                                id="confirm"
                                                                onChange={this.handleAccountInfoChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group d-flex justify-content-around my-1">
                                                        <button style={{ width: '30%' }} className="btn btn-danger text-white font-weight-bold" type="button" onClick={this.handleAccountInfoSubmit}>
                                                            Change Password
                                                        </button>
                                                        <button style={{ width: '30%' }} className="btn btn-light font-weight-bold" type="button" onClick={()=>{
                                                                this.props.onResetChangePasswordStatus();
                                                                close();
                                                        }}>
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Popup>
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