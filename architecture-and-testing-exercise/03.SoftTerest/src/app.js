import { get } from './api/api.js';
import * as api from './api/users.js';
import { initialize } from './router.js';
import { spinner } from './util.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';

document.getElementById('views').remove();


let links = {
    "/": showHome,
    "/catalog": showCatalog,
    "/login": showLogin,
    "/details": showDetails,
    "/register": showRegister,
    "/create": showCreate,
    "/logout": onLogout
}

const router = initialize(links);
router.updateNav();
router.goto('/');

async function onLogout() {
    api.logout();
    router.updateNav();
}