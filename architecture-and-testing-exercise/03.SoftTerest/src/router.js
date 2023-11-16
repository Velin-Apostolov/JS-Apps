import { spinner } from "./util.js";

export function initialize(links) {
    let nav = document.querySelector('body > nav');
    let main = document.querySelector('main');
    nav.addEventListener('click', onNavigate);

    let context = {
        showSection,
        goto,
        updateNav
    }

    return context;

    function showSection(section) {
        main.replaceChildren(spinner());
        main.replaceChildren(section);
    }

    function onNavigate(event) {
        if (event.target.tagName == 'A' || event.target.tagName == 'IMG') {
            event.preventDefault();
            let url = '';
            if (event.target.tagName == 'IMG') {
                url = new URL(event.target.parentElement.href).pathname;
            } else {
                url = new URL(event.target.href).pathname;
            }
            goto(url);
        }
    }

    function goto(name, ...params) {
        let path = links[name];
        if (typeof path == 'function') {
            path(context, ...params);
        }
    }

    function updateNav() {
        let user = localStorage.getItem('userData');

        if (user) {
            nav.querySelectorAll('.user').forEach(field => field.style.display = 'block');
            nav.querySelectorAll('.guest').forEach(field => field.style.display = 'none');
        } else {
            nav.querySelectorAll('.user').forEach(field => field.style.display = 'none');
            nav.querySelectorAll('.guest').forEach(field => field.style.display = 'block');
        }
    }
}