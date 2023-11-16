import { createIdea } from "../api/data.js";
let section = document.getElementById('create-page');
let form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

let ctx = null;

export function showCreate(context) {
    ctx = context;
    context.showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();

    let formData = new FormData(form);
    let title = formData.get('title');
    let description = formData.get('description');
    let img = formData.get('imageURL');
    let data = {
        title,
        description,
        img
    }

    if (title.length > 5 && description.length > 9 && img.length > 4) {
        await createIdea(data);
    }
    form.reset();
    ctx.goto('/');
}