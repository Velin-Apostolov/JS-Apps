let userData = JSON.parse(localStorage.getItem('userData'));
let usernamePara = document.querySelector('body > header > nav > p > span');
let guestDiv = document.getElementById('guest');
let logoutBtn = document.getElementById('logout');
let userDiv = document.getElementById('user');
let catchesDiv = document.getElementById('main');
let sectionDiv = document.getElementById('home-view');
let loadBtn = document.querySelector('.load');
let allCatches = document.getElementById('catches');
let addBtn = document.querySelector('.add');
let addForm = document.getElementById('addForm');
let main = document.querySelector('main');
let lougoutURL = 'http://localhost:3030/users/logout';

let textPara = document.createElement('p');
textPara.textContent = 'Click to load catches';
main.prepend(textPara);
allCatches.replaceChildren();
catchesDiv.style.display = "none";

loadBtn.addEventListener('click', loadCatches);

if (!userData) {
    userDiv.style.display = 'none';
} else {

    let email = userData.email;
    let id = userData.id;
    let token = userData.token;

    guestDiv.style.display = 'none';
    usernamePara.textContent = email;
    addBtn.removeAttribute('disabled');
    loadCatches();
    addForm.addEventListener('submit', addCatch);

    logoutBtn.addEventListener('click', async () => {

        let options = {
            method: "GET",
            headers: {
                "X-Authorization": token
            }
        }

        let response = await fetch(lougoutURL, options);

        if (response.status == 204) {
            localStorage.clear();
            guestDiv.style.display = 'inline-block';
            userDiv.style.display = 'none';
            usernamePara.textContent = 'guest';
            window.location = './index.html';
        }

    });

}

async function loadCatches() {

    textPara.remove();

    catchesDiv.style.display = 'inline-block';

    let url = 'http://localhost:3030/data/catches';

    try {

        let response = await fetch(url);

        if (!response.ok) {
            let error = await response.json();
            throw new Error(error.message);
        }

        allCatches.replaceChildren();

        let data = await response.json();

        for (let fish of data) {

            let id = fish._id;
            let ownerId = fish._ownerId;

            let mainDiv = await createDiv(id, ownerId);

            allCatches.appendChild(mainDiv);

        }

    } catch (error) {
        console.error(error);
    }

}

async function createDiv(id, ownerId) {

    let url = `http://localhost:3030/data/catches/${id}`;

    try {

        let response = await fetch(url);

        if (!response.ok) {
            let error = await response.json();
            throw new Error(error.message);
        }

        let data = await response.json();


        let angler = data.angler;
        let weight = data.weight;
        let species = data.species;
        let location = data.location;
        let bait = data.bait;
        let captureTime = data.captureTime;

        let mainDiv = document.createElement('div');
        mainDiv.classList.add('catch');

        let anglerLabel = document.createElement('label');
        anglerLabel.textContent = 'Angler';
        mainDiv.appendChild(anglerLabel);

        let inputAngler = document.createElement('input');
        inputAngler.type = 'text';
        inputAngler.classList.add('angler');
        inputAngler.setAttribute('value', angler);
        mainDiv.appendChild(inputAngler);

        let weightLabel = document.createElement('label');
        weightLabel.textContent = 'Weight';
        mainDiv.appendChild(weightLabel);

        let inputWeight = document.createElement('input');
        inputWeight.type = 'text';
        inputWeight.classList.add('weight');
        inputWeight.setAttribute('value', weight);
        mainDiv.appendChild(inputWeight);

        let speciesLabel = document.createElement('label');
        speciesLabel.textContent = 'Species';
        mainDiv.appendChild(speciesLabel);

        let inputSpecies = document.createElement('input');
        inputSpecies.type = 'text';
        inputSpecies.classList.add('species');
        inputSpecies.setAttribute('value', species);
        mainDiv.appendChild(inputSpecies);

        let locationLabel = document.createElement('label');
        locationLabel.textContent = 'Location';
        mainDiv.appendChild(locationLabel);

        let inputLocation = document.createElement('input');
        inputLocation.type = 'text';
        inputLocation.classList.add('location');
        inputLocation.setAttribute('value', location);
        mainDiv.appendChild(inputLocation);

        let baitLabel = document.createElement('label');
        baitLabel.textContent = 'Bait';
        mainDiv.appendChild(baitLabel);

        let inputBait = document.createElement('input');
        inputBait.type = 'text';
        inputBait.classList.add('bait');
        inputBait.setAttribute('value', bait);
        mainDiv.appendChild(inputBait);

        let capTimeLabel = document.createElement('label');
        capTimeLabel.textContent = 'Capture Time';
        mainDiv.appendChild(capTimeLabel);

        let inputCapTime = document.createElement('input');
        inputCapTime.type = 'number';
        inputCapTime.classList.add('captureTime');
        inputCapTime.setAttribute('value', captureTime);
        mainDiv.appendChild(inputCapTime);

        let updateBtn = document.createElement('button');
        updateBtn.textContent = 'Update'
        updateBtn.classList.add('update');
        mainDiv.appendChild(updateBtn);

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete');
        mainDiv.appendChild(deleteBtn);

        if (!userData || ownerId != userData.id) {
            updateBtn.setAttribute('disabled', true);
            deleteBtn.setAttribute('disabled', true);
        } else {
            updateBtn.dataset.id = id;
            deleteBtn.dataset.id = id;
            updateBtn.addEventListener('click', updateCatch);
            deleteBtn.addEventListener('click', deleteCatch);
        }

        return mainDiv;


    } catch (error) {
        console.error(error);
    }
}

async function updateCatch(event) {

    let id = event.target.dataset.id;
    let url = `http://localhost:3030/data/catches/${id}`;

    let parentDiv = event.target.parentElement;
    let allInputs = Array.from(parentDiv.querySelectorAll('input'));

    let inputCheck = allInputs.some((field) => field.value.trim() == '');

    if (!inputCheck) {
        let weight = allInputs[1].value;
        if (!isNaN(weight)) {

            let updatedCatch = {};

            for (let property of allInputs) {
                let propertyName = property.className;
                let propertyValue = '';
                if (propertyName == 'weight' || propertyName == 'captureTime') {
                    propertyValue = Number(property.value);
                } else {
                    propertyValue = property.value;
                }
                updatedCatch[propertyName] = propertyValue;
            }

            try {

                // might need to convert the numbers (weight/capturetime) back to Strings (default)

                let token = userData.token;

                let options = {
                    method: "PUT",
                    headers: {
                        "Content-Type": 'application/json',
                        "X-Authorization": token
                    },
                    body: JSON.stringify(updatedCatch)
                }

                let response = await fetch(url, options);

                if (!response.ok) {
                    let error = await response.json();
                    throw new Error(error.message);
                }

                loadCatches();

            } catch (error) {
                console.error(error);
            }

        }
    }

}

async function deleteCatch(event) {

    let id = event.target.dataset.id;
    let url = `http://localhost:3030/data/catches/${id}`;

    let options = {
        method: "DELETE",
        headers: {
            "X-Authorization": userData.token
        }
    }

    await fetch(url, options);

    let deletedDiv = event.target.parentElement;
    deletedDiv.remove();

}

async function addCatch(event) {

    let token = userData.token;
    let url = 'http://localhost:3030/data/catches/';

    event.preventDefault();

    if (!userData) {
        window.location = './login.html';
        return;
    }

    let formData = new FormData(addForm);
    let allValues = Array.from(formData.values());
    let allKeys = Array.from(formData.keys());
    let newCatch = {};

    let inputCheck = allValues.some((field) => field == '');

    if (!inputCheck) {
        allKeys.map((x, i) => {
            // might need to convert weight and captureTime back to strings (default)
            let currentValue;
            if (i == 1 || i == 5) {
                currentValue = Number(allValues[i]);
            } else {
                currentValue = allValues[i];
            }
            newCatch[x] = currentValue;
        });
    }

    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": token
        },
        body: JSON.stringify(newCatch)
    }

    try {

        let response = await fetch(url, options);

        if (!response.ok) {
            let error = await response.json();
            throw new Error(error.message);
        }

        await response.json();

        loadCatches();

        addForm.reset();

    } catch (error) {
        console.error(error);
    }

}