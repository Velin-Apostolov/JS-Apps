import { login } from "../api/users.js";

let section = document.getElementById('login-page');
let form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

let ctx = null;

export function showLogin(context) {
    ctx = context;
    context.showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();

    let formData = new FormData(form);
    let email = formData.get('email');
    let password = formData.get('password');
    await login(email, password);
    form.reset();
    ctx.updateNav();
    ctx.goto('/');
}