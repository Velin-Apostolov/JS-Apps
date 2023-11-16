import { createPage } from "./create.js";
import { detailsPage } from "./details.js";
import { homePage } from "./home.js";
import { loginPage } from "./login.js";
import { registerPage } from "./register.js";
import { showSection, updateNav } from "./util.js";

let navBar = document.querySelector('nav');
let addMovieBtn = document.getElementById('add-movie-button');

let routes = {
    '/': homePage,
    '/login': loginPage,
    '/logout': logout,
    '/register': registerPage,
    '/create': createPage,
}

navBar.addEventListener('click', onNavigate);
addMovieBtn.addEventListener('click', onNavigate);

function onNavigate(event) {
    if (event.target.tagName == 'A' && event.target.href) {

        event.preventDefault();

        let url = new URL(event.target.href);
        let path = routes[url.pathname];

        if (typeof path == 'function') {
            path();
        }

    }
}

function logout() {
    localStorage.removeItem('userData');
    updateNav();
    loginPage();
}

homePage();