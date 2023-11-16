import { html, render } from "../node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";

let main = document.querySelector('body');
main.replaceChildren();

let searchTemplate = (towns, match) => html`
<article>
        <div id="towns">
            <ul>
            ${towns.map(t => html`
             <li class = ${match && t.toLowerCase().includes(match.toLowerCase()) ? 'active' : ''}>${t}</li>
            `)}
            </ul>
        </div>
        <input type="text" id="searchText" />
        <button @click=${search}>Search</button>
        <div id="result">${countMatches(towns, match)}</div>
    </article>
`

update();

function update(match = '') {
   let result = searchTemplate(towns, match);
   render(result, main);
}

function search() {
   let currSearch = document.getElementById('searchText').value;
   update(currSearch);
}

function countMatches(towns, match) {
   let matches = towns.filter(t => match && t.toLowerCase().includes(match.toLowerCase())).length;
   return `${matches} matches found`;
}