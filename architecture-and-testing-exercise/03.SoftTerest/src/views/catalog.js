import { getAllIdeas } from '../api/data.js';
let section = document.getElementById('dashboard-holder');
section.addEventListener('click', onDetailsSelect);

let ctx = null;

let allIdeas = null;

export async function showCatalog(context) {
    ctx = context;
    allIdeas = await getAllIdeas();
    if (allIdeas.length == 0) {
        section.innerHTML = `<h1>No ideas yet! Be the first one :)</h1>`;
    } else {
        renderCatalog();
    }
    context.showSection(section);
}

function createIdeaPreview(idea) {

    let mainDiv = document.createElement('div');


    mainDiv.className = 'card overflow-hidden current-card details';
    mainDiv.style.width = '20rem';
    mainDiv.style.height = '18rem';
    mainDiv.innerHTML = `<div class="card-body">
        <p class="card-text">${idea.title}</p>
    </div>
    <img class="card-image" src="${idea.img}" alt="Card image cap">
    <a data-id=${idea._id} class="btn" href="/details">Details</a>
    </div>`

    return mainDiv;
};

function renderCatalog() {
    let docFragment = document.createDocumentFragment();
    allIdeas.forEach(idea => docFragment.appendChild(createIdeaPreview(idea)));
    section.replaceChildren(docFragment);
}

function onDetailsSelect(event) {
    if (event.target.tagName == 'A') {
        event.preventDefault();
        let id = event.target.dataset.id;
        if (id) {
            ctx.goto('/details', id);
        }
    }
}