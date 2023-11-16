let allViewSections = [...document.querySelectorAll('.view-section')];

function hideAll() {
    allViewSections.forEach(x => x.style.display = 'none');
}

export function showSection(section) {
    hideAll();
    section.style.display = 'block';
}

export function spinner() {
    let element = document.createElement('p');
    element.innerHTML = 'Loading &hellip;';

    return element;
}

export function updateNav() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    let welcomeMsg = document.getElementById('welcome-msg');

    if (!userData) {
        document.querySelectorAll('.user').forEach(x => x.style.display = 'none');
        document.querySelectorAll('.guest').forEach(x => x.style.display = 'inline-block');
    } else {
        document.querySelectorAll('.user').forEach(x => x.style.display = 'inline-block');
        document.querySelectorAll('.guest').forEach(x => x.style.display = 'none');
        welcomeMsg.textContent = `Welcome, ${userData.email}`;
    }
}