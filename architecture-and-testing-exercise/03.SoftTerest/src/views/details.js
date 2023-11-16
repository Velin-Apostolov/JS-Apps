import { deleteIdea, getIdeaDetails } from "../api/data.js";

let section = document.getElementById('details-page');

let ctx = null;

export async function showDetails(context, id) {
    ctx = context;
    let currentIdea = await getIdeaDetails(id);
    if (currentIdea) {
        section.replaceChildren(createPreview(currentIdea));
    }
    let user = JSON.parse(localStorage.getItem('userData'));
    let isOwner = user && user._id == currentIdea._ownerId;
    if (isOwner) {
        section.querySelector('.btn').addEventListener('click', async (event) => {
            event.preventDefault();
            await deleteIdea(currentIdea._id);
            ctx.goto('/catalog');
        });
    }
    context.showSection(section);
}

function createPreview(idea) {
    let userData = JSON.parse(localStorage.getItem('userData'));
    let element = document.createElement('template');
    element.innerHTML = `<img class="det-img" src="${idea.img}" />
    <div class="desc">
        <h2 class="display-5">${idea.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${idea.description}</p>
    </div>`
    if (userData) {
        let userId = userData._id;
        if (userId == idea._ownerId) {
            element.innerHTML += `<div class="text-center">
            <a class="btn detb" href="">Delete</a>
        </div>`
        }
    }    

    return element.content;
}



{/* <img class="det-img" src="./images/dinner.jpg" />
            <div class="desc">
                <h2 class="display-5">Dinner Recipe</h2>
                <p class="infoType">Description:</p>
                <p class="idea-description">There are few things as comforting as heaping bowl of pasta at the end of a long
                    day. With so many easy pasta recipes out there, there's something for every palate to love. That's why
                    pasta
                    makes such a quick, easy dinner for your family—it's likely to satisfy everyone's cravings, due to its
                    versatility.</p>
            </div>
            <div class="text-center">
                <a class="btn detb" href="">Delete</a>
            </div> */}