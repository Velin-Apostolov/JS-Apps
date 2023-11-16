import { showSection, spinner } from "./util.js";

let section = document.getElementById('movie-example');

export function detailsPage(id) {
    showSection(section);
    displayMovie(id);
}

async function displayMovie(id) {
    section.replaceChildren(spinner());
    let movie = await getMovie(id);
    section.replaceChildren(createMovieCard(movie));
}

function createMovieCard(movie) {

    let mainDiv = document.createElement('div');
    mainDiv.className = 'container';
    mainDiv.innerHTML = `<div class="row bg-light text-dark">
    <h1>Movie title: ${movie.title}</h1>

    <div class="col-md-8">
      <img
        class="img-thumbnail"
        src="${movie.img}"
        alt="Movie"
      />
    </div>
    <div class="col-md-4 text-center">
      <h3 class="my-3">Movie Description</h3>
      <p>
        ${movie.description}
      </p>
      ${createControls(movie)}
    </div>
  </div>`;

  return mainDiv;
}

function createControls(movie) {
    let userData = JSON.parse(localStorage.getItem('userData'));
    let isOwner = userData && userData._id == movie._ownerId;

    if (isOwner) {
        return `<a class="btn btn-danger" href="#">Delete</a>
        <a class="btn btn-warning" href="#">Edit</a>`;
    } else {
        return `<a class="btn btn-primary" href="#">Like</a>
        <span class="enrolled-span">Liked ${getLikes(movie._id)}}</span>`;
    }
}

async function getMovie(id) {
    let url = `http://localhost:3030/data/movies/${id}`;

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

async function getLikes(id) {

    try {

        let url = `http:/localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`;

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

async function getOwnLike(movieId, userId) {

}