import { register } from "../api/users.js";

let section = document.getElementById('register-page');
let form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

let ctx = null;

export function showRegister(context) {
    ctx = context;
    context.showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();

    let formData = new FormData(form);
    let email = formData.get('email');
    let password = formData.get('password');
    let rePass = formData.get('repeatPassword');

    if (password != rePass) {
        alert('Passwords must match!');
        form.reset();
    }

    await register(email, password);
    form.reset();
    ctx.updateNav();
    ctx.goto('/');
}