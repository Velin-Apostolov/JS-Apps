import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { showCatalog } from "./catalog.js";
import { showCreate } from "./create.js";
import { showUpdate } from "./update.js";
import * as api from "./api.js"

let root = document.body;
let book;

let ctx = {
    update,
    book
}

update();

let table = document.querySelector('table');

table.addEventListener('click', (event) => {
    if (event.target.tagName == 'BUTTON') {
        if (event.target.textContent == 'Edit') {
            let tr = event.target.parentElement.parentElement;
            let [titleElement, authorElement] = tr.querySelectorAll('td');
            let title = titleElement.textContent;
            let author = authorElement.textContent;
            ctx.book = {};
            ctx.book['title'] = title;
            ctx.book['author'] = author;
            ctx.book['id'] = event.target.id;
            showUpdate(ctx);
        } else if (event.target.textContent == 'Delete') {
        }
    }
});


function update() {
    render([
        showCatalog(ctx),
        showCreate(ctx),
        showUpdate(ctx)
    ], root)
}

function toggle() {

}