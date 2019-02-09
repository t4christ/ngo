import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    passwordReset,
    passwordConfirm,
    getProfile,
    updateProfile,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                    dispatch(alertActions.success('Login successful'));
                },
                error => {
                    // dispatch(failure(error.toString()));

                    // dispatch(alertActions.error("Incorrect User Details. Try Again."));


                    let e_arr = []
                    Object.keys(error).forEach((prop) =>
                    // `prop` is the property name
                    // `data[prop]` is the property value
                    e_arr.push(error[prop])
                  )
                //   dispatch(failure(error.toString(err_arr)));
                setTimeout(()=>{
                    dispatch(alertActions.error(e_arr.toString()));
                },1000)
                 
                   return dispatch(alertActions.error('Due to Network Issue Data Was Unable to Load. Refresh the page.'));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    
                    let e_arr = []
                    Object.keys(error).forEach((prop) =>
                    // `prop` is the property name
                    // `data[prop]` is the property value
                    e_arr.push(error[prop])
                  )
                //   dispatch(failure(error.toString(err_arr)));
                setTimeout(()=>{
                    dispatch(alertActions.error(e_arr.toString().split(',').join("\r\n")));
                },1000)
                    
                 
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(err_arr) { return { type: userConstants.REGISTER_FAILURE, err_arr } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}


function getProfile(username) {
    return dispatch => {
        dispatch(request());

        userService.getProfileId(username)
            .then(
                profile => dispatch(success(profile)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(profile) { return { type: userConstants.GETALL_SUCCESS, profile } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function updateProfile(user) {
    return dispatch => {
        dispatch(request());

        userService.updateProfile(user)
            .then(
                uprofile => dispatch(success(uprofile)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.UPDATE_PROFILE_REQUEST } }
    function success(uprofile) { return { type: userConstants.UPDATE_PROFILE_SUCCESS, uprofile } }
    function failure(error) { return { type: userConstants.UPDATE_PROFILE_FAILURE, error } }
}


// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}



function passwordReset(email) {
    return dispatch => {
        dispatch(request());

        userService.passwordReset(email)
            .then(
                email => dispatch(success(email)),
                error => 
                
                dispatch(failure(error.toString())),
                dispatch(alertActions.error())
            );
    };

    function request() { return { type: userConstants.PASSWORD_REQUEST } }
    function success(email) { return { type: userConstants.PASSWORD_SUCCESS, email } }
    function failure(error) { return { type: userConstants.PASSWORD_FAILURE, error } }
}


function passwordConfirm(confirm) {
    return dispatch => {
        dispatch(request());

        userService.passwordConfirm(confirm)
            .then(
                confirm => dispatch(success(confirm)),
                error => dispatch(failure(error.toString())),
                dispatch(alertActions.error("Token has expired or already used. Try resetting your password again."))
            );
    };

    function request() { return { type: userConstants.PASSWORD_CONFIRM_REQUEST } }
    function success(confirm) { return { type: userConstants.PASSWORD_CONFIRM_SUCCESS, confirm } }
    function failure(error) { return { type: userConstants.PASSWORD_CONFIRM_FAILURE, error } }
}

