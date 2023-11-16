import { detailsPage } from "./details.js";
import { showSection, spinner, updateNav } from "./util.js";

let section = document.getElementById('home-page');
let catalog = document.getElementById('movies-list');

catalog.addEventListener('click', (event) => {

    if (event.target.tagName == 'BUTTON') {

        event.preventDefault();

        let movieId = event.target.dataset.id;
        detailsPage(movieId);

    }
});

export function homePage() {
    showSection(section);
    showMovies();
    updateNav();
}

async function showMovies() {
    catalog.replaceChildren(spinner());
    let movies = await getMovies();
    catalog.replaceChildren(...movies.map(createMoviePreview));
}

function createMoviePreview(movie) {
    let mainDiv = document.createElement('div');
    mainDiv.className = 'card mb-4';

    let imgEle = document.createElement('img');
    imgEle.classList.add('card-img-top');
    imgEle.src = movie.img;
    imgEle.alt = 'Card image cap';
    imgEle.width = 400;
    mainDiv.appendChild(imgEle);

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    let h4 = document.createElement('h4');
    h4.classList.add('card-title');
    h4.textContent = movie.title;

    cardBody.appendChild(h4);
    mainDiv.appendChild(cardBody);

    let cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer');

    let anchor = document.createElement('a');
    anchor.href = `/details/${movie._id}`;

    let detailsBtn = document.createElement('button');
    detailsBtn.dataset.id = movie._id;
    detailsBtn.textContent = 'Details';
    detailsBtn.className = 'btn btn-info';
    detailsBtn.type = 'button';
    
    anchor.appendChild(detailsBtn);
    cardFooter.appendChild(anchor);
    mainDiv.appendChild(cardFooter);

    return mainDiv;
}

async function getMovies() {

    let url = 'http://localhost:3030/data/movies';

    try {

        let response = await fetch(url);

        if (!response.ok) {
            let error = await response.json();
            throw new Error(error.message);
        }

        let data = await response.json();

        return data;

    } catch (error) {
        alert(error);
    }

}