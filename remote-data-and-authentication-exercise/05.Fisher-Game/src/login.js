let userData = JSON.parse(localStorage.getItem('userData'));
let loginForm = document.querySelector('main > section > form');
let usernamePara = document.querySelector('body > header > nav > p');

if (userData) {
    document.getElementById('user').style.display = 'inline-block';
    document.getElementById('guest').style.display = 'none';
    document.querySelector('body > header > nav > p > span').textContent = userData.email;
} else {
    document.getElementById('user').style.display = 'none';
    document.getElementById('guest').style.display = 'inline-block';
    document.querySelector('body > header > nav > p > span').textContent = 'guest';
}

let logoutBtn = document.getElementById('logout');
let lougoutURL = 'http://localhost:3030/users/logout';

logoutBtn.addEventListener('click', async () => {

    let options = {
        method: "GET",
        headers: {
            "X-Authorization": userData.token
        }
    }

    let response = await fetch(lougoutURL, options);

    if (response.status == 204) {
        localStorage.clear();
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('user').style.display = 'none';
        usernamePara.textContent = 'guest';
        window.location = './index.html';
    }

});

let url = 'http://localhost:3030/users/login';

loginForm.addEventListener('submit', logUser);

async function logUser(event) {
    
    event.preventDefault();

    let formData = new FormData(loginForm);

    let email = formData.get('email');
    let password = formData.get('password');

    try {
        
        if (email == '' || password == '') {
            throw new Error('All fields should be filled!');
        }

        let info = {
            email,
            password
        }

        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        }

        let response = await fetch(url, options);

        if (!response.ok) {
            let error = await response.json();
            throw new Error(error.message);
        }

        let data = await response.json();

        let user = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        }

        localStorage.setItem('userData', JSON.stringify(user));

        loginForm.reset();
        window.location = './index.html';

    } catch(error) {
        loginForm.reset();
        console.error(error.message);
    }

}