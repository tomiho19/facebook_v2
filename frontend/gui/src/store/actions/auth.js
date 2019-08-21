import * as actionTypes from './actionTypes';
import axios from 'axios';
import openNotificationWithIcon from "../../helpers/openNotificationWithIcon";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token
    }
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const  checkAuthTimeout = expirationDate => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout);
        }, expirationDate * 1000)
    }
};

export const authLogin = (email, password) => {
    let config = {
      headers: { Authorization: "bearer " + localStorage.getItem('token') }
    };
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/login/', {
            username: email,
            email: email,
            password: password,
        }, config).then(
            response => {
                openNotificationWithIcon('success', 'Success', 'You have been logged in, please wait a second');
                handleResponse(response, dispatch);
            },
            errors => {
                openNotificationWithIcon('error', 'Error', 'Please check your credentials');
            }
        ).catch(errors => {
            dispatch(authFail(errors));
        })
    }
};

export const handleResponse = (response, dispatch) => {
    const token = response.data.key;
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', JSON.stringify(expirationDate));
    dispatch(authSuccess(token));
    dispatch(checkAuthTimeout(3600))
};

export const authSignup = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        return axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
            username: email,
            email: email,
            password1: password,
            password2: password
        }).then(
            response => {
                handleResponse(response, dispatch);
            },
            errors => {
                openNotificationWithIcon('error', 'Error', 'Please check your input data');
            }
        ).catch(errors => {
            dispatch(authFail(errors));
        })
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout())
        } else {
            const expirationDate = new Date(JSON.parse(localStorage.getItem('expirationDate')));
            if (expirationDate <= new Date()){
                dispatch(logout())
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000) );
            }
        }
    }
};