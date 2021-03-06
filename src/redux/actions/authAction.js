import axios                 from 'axios';
import PropTypes             from 'prop-types';

import { 
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGOUT
}                            from '../consts';
import { BASE_URL, headers } from '../../helpers/API';

export const login = (user) => {
    return(dispatch) => {
        dispatch(loginRequest);
        axios.post(BASE_URL + `validate`,
            user, headers)
            .then(response => {
                console.log('AUTH RESPONSE', response);
                if(response.data.status === 'ok'){
                    dispatch(loginSuccess(response.data));
                } else {
                    dispatch(loginFailure(response.data));
                }
            })
            .catch(response => {
                dispatch(loginFailure(response.data));
            })
    }
};

login.PropTypes = {
    user: PropTypes.shape({
        email: PropTypes.string,
        password: PropTypes.string
    })
};

const loginRequest = () => {
    return{
        type: LOGIN_REQUEST
    }
}

const loginSuccess = (payload) => {
    return{
        type: LOGIN_SUCCESS,
        payload
    }
};

const loginFailure = (payload) => {
    return{
        type: LOGIN_FAILURE,
        payload
    }
};

export const logout = () => {
    return{
        type: LOGOUT
    }
};






