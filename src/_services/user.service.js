// import {config} from './';
import { authHeader } from '../_helpers';


// const API = "http://localhost:8009/api"
const API = "https://buyfourfree.herokuapp.com/api"

export const userService = {
    login,
    logout,
    register,
    getAll,
    getGift,
    receiveGift,
    testimonial,
    getAidCat,
    giveGift,
    passwordReset,
    passwordConfirm,
    getProfileId,
    updateProfile,
    about,
    giftById,
    update,
    category_search,
    delete: _delete
};


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log("My response data",data)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            console.log("My error response",error)
            return Promise.reject(data);
        }
    else if(response.status === 201 || response.status === 200 ){
         
        return data
    }

        return data;
    });
}



function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${API}/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                user = {username:user.username,token:user.token}
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            console.log("User Token",user.token)
            return user;
        });
}

function logout() {
    
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}




function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${API}/update_user`, requestOptions).then(handleResponse);
}

function getProfileId(username) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${API}/get_profile/${username}`, requestOptions).then(handleResponse);
}


function updateProfile(user) {
    const {username,token} = JSON.parse(localStorage.getItem('user'))
   
    const requestOptions = {
        method: 'PUT',
        headers:{ 'Content-Type':'application/json',Authorization: `Token ${token }`},
        body: JSON.stringify(user)
    };

    return fetch(`${API}/profiles/${username}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${API}/register`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${API}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${API}/users/${id}`, requestOptions).then(handleResponse);
}


function passwordReset(email) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(email)
    };

    return fetch(`${API}/password_reset/reset_password/`, requestOptions).then(handleResponse);
}



function passwordConfirm(confirm) {
    // const {token}=confirm
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(confirm)
    };

    return fetch(`${API}/password_reset/confirm/`, requestOptions).then(handleResponse);
}



// Givers Section

function about() {
    
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${API}/about`, requestOptions).then(handleResponse);
}

function getGift() {
    
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${API}/gifts`, requestOptions).then(handleResponse);
}


function getAidCat() {
    
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${API}/gifts_category`, requestOptions).then(handleResponse);
}



function giveGift(giver) {
    const {username,token} = JSON.parse(localStorage.getItem('user'))
    const {image}=giver
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type':'application/json',Authorization: `Token ${token }`},
        body: JSON.stringify(giver)
        
    };

    return fetch(`${API}/giving/${username}`, requestOptions).then(handleResponse);
}

function receiveGift(receiver) {
    const {username,token} = JSON.parse(localStorage.getItem('user'))
    const {image}=receiver
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type':'application/json',Authorization: `Token ${token }`},
        body: JSON.stringify(receiver)
        
    };


return fetch(`${API}/receiver/${username}`, requestOptions).then(handleResponse);
}



function testimonial(testify) {
    const {username,token} = JSON.parse(localStorage.getItem('user'))
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type':'application/json',Authorization: `Token ${token }`},
        body: JSON.stringify(testify)
        
    };



    return fetch(`${API}/testify/${username}`, requestOptions).then(handleResponse);
}


function category_search(category) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${API}/category_search/${category}`, requestOptions).then(handleResponse);
}

function giftById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${API}/giving_detail/${id}`, requestOptions).then(handleResponse);
}

// End Givers Section