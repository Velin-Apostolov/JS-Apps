window.addEventListener('load', cookBook);

async function cookBook() {

    let main = document.querySelector('main');
    main.replaceChildren();
    let url = 'http://localhost:3030/jsonstore/cookbook/recipes';

    let response = await fetch(url);

    let data = await response.json();

    for (const recipe in data) {

        let id = data[recipe]._id;
        let recipeName = data[recipe].name;
        let recipeImg = data[recipe].img;

        let currentArticle = document.createElement('article');
        currentArticle.classList.add('preview');
        currentArticle.id = id;
        currentArticle.innerHTML = `<div class="title">
        <h2>${recipeName}</h2>
        </div>
        <div class="small">
        <img src="${recipeImg}">
        </div>`

        let hiddenArticle = document.createElement('article');
        hiddenArticle.style.display = 'none';
        hiddenArticle.id = `hidden${id}`;

        currentArticle.addEventListener('click', async (event) => {

            let clickedArticle = event.currentTarget;
            let currentId = clickedArticle.id;
            let url = `http://localhost:3030/jsonstore/cookbook/details/${currentId}`;

            let response = await fetch(url);
            let data = await response.json();

            let name = data.name;
            let img = data.img;
            let steps = data.steps;
            let ingredients = data.ingredients;

            hiddenArticle.innerHTML = `<h2>${name}</h2>
            <div class="band">
                <div class="thumb">
                    <img src="${img}">
                </div>
                <div class="ingredients">
                    <h3>Ingredients:</h3>
                    <ul>
                    ${ingredients.map((x) => `<li>${x}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="description">
                <h3>Preparation:</h3>
                ${steps.map((x) => `<li>${x}</li>`).join('')}
            </div>`
            hiddenArticle.style.display = 'block';
            clickedArticle.style.display = 'none';

            hiddenArticle.addEventListener('click', () => {
                hiddenArticle.style.display = 'none';
                clickedArticle.style.display = 'block';
            })

        });

        main.appendChild(currentArticle);
        main.appendChild(hiddenArticle);
    }
}