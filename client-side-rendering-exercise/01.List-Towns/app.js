import { html, render } from "../node_modules/lit-html/lit-html.js";

let root = document.getElementById('root');
let unorderedList = document.createElement('ul');
root.appendChild(unorderedList);

let towns = document.getElementById('towns');
let form = document.querySelector('form');

let template = (city) => html`
<li>${city}</li>
`;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let allTowns = towns.value.split(', ');
    render(allTowns.map(template), unorderedList);
})