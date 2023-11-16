import { homePage } from "./home.js";
import { showSection, updateNav } from "./util.js";

let section = document.getElementById('form-login');
let form = document.querySelector('#form-login > form');
form.addEventListener('submit', loginReq);

export function loginPage() {
    showSection(section);
}

async function loginReq(e) {
    e.preventDefault();
    let formData = new FormData(form);

    let email = formData.get('email');
    let password = formData.get('password');

    await login(email, password);
    form.reset();
    updateNav();
    homePage();

}

async function login(email, password) {
    let url = 'http://localhost:3030/users/login';

    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    }

    try {

        let response = await fetch(url, options);

        if (!response.ok) {
            let error = await response.json();
            throw new Error(error.message);
        }

        let data = await response.json();

        localStorage.setItem('userData', JSON.stringify(data));

    } catch (error) {
        form.reset();
        alert(error);
    }
}