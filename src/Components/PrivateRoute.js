import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                let user = localStorage.getItem('user');
                let setupTime = localStorage.getItem('setTimeLogIn');
                let now = new Date().getTime();

                if (user && setupTime - now < 3 * 24 * 60 * 60 * 1000) {
                    return (
                        <Component {...props}></Component>
                    );
                }
                else {
                    localStorage.removeItem('user');
                    localStorage.removeItem('setTimeLogIn');
                    return (
                        <Redirect to={
                            {
                                pathname: '/login',
                                state: {
                                    from: props.location,
                                }
                            }
                        }
                        ></Redirect>
                    );
                }
            }
        }
        ></Route>
    );
}

export const LoginRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                return (// kiểm tra xem đã có thông tin người dùng trong localStorage chưa
                    localStorage.getItem('user')
                        ? <Redirect to={
                            {
                                pathname: '/login',
                                state: {
                                    from: props.location,
                                }
                            }
                        }
                        ></Redirect>
                        : <Component {...props}></Component>
                );
            }
        }
        ></Route>
    );
}