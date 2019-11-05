const ApiUrl = "http://localhost:8080";

export const us = {
    login,
    register,
    update,
    changePassword,
    changeAvatar,
    updateResultMatch
}

function login(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${ApiUrl}/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user !== false) {
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('setTimeLogIn', new Date().getTime());
            }

            return user;
        });
}

function register(user) {
    user.name = user.username;

    const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    };

    return fetch(`${ApiUrl}/register`, requestOption)
        .then(handleResponse);

}

function update(id, userInfo) {
    let chosen = JSON.parse(localStorage.getItem('user')); 
    const requestOption = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${chosen.token}`,
        },
        body: JSON.stringify({ id, user: userInfo }),
    };

    return fetch(`${ApiUrl}/users/update`, requestOption)
        .then(handleResponse);
}

function changePassword(id, password) {
    let chosen = JSON.parse(localStorage.getItem('user')); 
    const requestOption = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${chosen.token}`,
        },
        body: JSON.stringify({ id, password }),
    };

    return fetch(`${ApiUrl}/update-password`, requestOption)
        .then(handleResponse);
}

function changeAvatar(id, url) {
    let chosen = JSON.parse(localStorage.getItem('user'));    
    const requestOption = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${chosen.token}`,
        },
        body: JSON.stringify({ id, url }),
    };
    return fetch(`${ApiUrl}/users/update-avatar`, requestOption)
        .then(handleResponse);

}

function updateResultMatch(id,win,draw,lost) {
    let chosen = JSON.parse(localStorage.getItem('user')); 
    const requestOption = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${chosen.token}`,
        },
        body: JSON.stringify({ id, user: {win,draw,lost,}}),
    };

    return fetch(`${ApiUrl}/users/update-match`, requestOption)
        .then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                //logout();
                //window.location.reload(true);
                alert('code: 401');
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

export default us;