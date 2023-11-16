import { homePage } from "./home.js";
import { showSection, updateNav } from "./util.js";

let section = document.getElementById('form-sign-up');
let form = document.getElementById('register-form');
form.addEventListener('submit', onSubmit)

export function registerPage() {
    showSection(section);
}

async function onSubmit(e) {

    e.preventDefault();

    let formData = new FormData(form);

    let email = formData.get('email');
    let password = formData.get('password');
    let rePass = formData.get('repeatPassword');

    if (email.trim() == '' ||
    password.length < 6 ||
    password != rePass) {
        form.reset();
        return;
    }

    await registrationReq(email, password);
    updateNav();
    homePage();

}

async function registrationReq(email, password) {

    let url = 'http://localhost:3030/users/register';

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