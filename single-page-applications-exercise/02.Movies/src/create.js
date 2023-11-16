import { homePage } from "./home.js";
import { showSection } from "./util.js";

let section = document.getElementById('add-movie');
let form = document.getElementById('add-movie-form');
form.addEventListener('submit', onSubmit);

export function createPage() {
    showSection(section);
}

async function onSubmit(e) {

    e.preventDefault();

    let formData = new FormData(form);

    let title = formData.get('title');
    let description = formData.get('description');
    let img = formData.get('img');

    if (title.trim() == '' ||
    description.trim() == '' ||
    img.trim() == '') {
        form.reset();
        return;
    }

    await postMovie(title, description, img);
    form.reset();
    homePage();

}

async function postMovie(title, description, img) {

    let userData = JSON.parse(localStorage.getItem('userData'));
    let token = userData.accessToken;

    try {

        let url = 'http://localhost:3030/data/movies';

        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": token
            },
            body: JSON.stringify({
                title,
                description,
                img
            })
        }

        let response = await fetch(url, options);

        if (!response.ok) {
            let error = await response.json();
            throw new Error(error.message);
        }

    } catch (error) {
        form.reset();
        alert(error);
    }

}