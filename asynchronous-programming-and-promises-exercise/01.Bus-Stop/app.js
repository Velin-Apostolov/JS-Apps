async function getInfo() {

    // let busStopID = document.getElementById('stopId').value;
    // let stopName = document.getElementById('stopName');
    // let busesList = document.getElementById('buses');

    // let url = `http://localhost:3030/jsonstore/bus/businfo/${busStopID}`;

    // fetch(url)
    // .then(response => {
    //     if (response.status != 200) {
    //         throw 'Error';
    //     } else {
    //         return response.json();
    //     }
    // }).then(data => {
    //     stopName.textContent = data.name;
    //     busesList.replaceChildren();

    //     for (const bus in data.buses) {
    //         let li = document.createElement('li');
    //         li.textContent = `Bus ${bus} arrives in ${data.buses[bus]} minutes`;
    //         busesList.appendChild(li);
    //     }
    // }).catch(error => {
    //     busesList.replaceChildren();
    //     stopName.textContent = error;
    // });

    // try {

    //     let response = await fetch(url);

    //     if (!response.ok) {
    //         stopName.textContent = 'Error';
    //         let error = new Error();
    //         error.status = response.status;
    //         error.statusText = response.statusText;
    //         throw error;
    //     }

    //     let data = await response.json();
    //     busesList.replaceChildren();
    //     stopName.textContent = data.name;

    //     for (const bus in data.buses) {
    //         let li = document.createElement('li');
    //         li.textContent = `Bus ${bus} arrives in ${data.buses[bus]} minutes`;
    //         busesList.appendChild(li);
    //     }

    // } catch(error) {
    //     busesList.replaceChildren();
    //     stopName.textContent = 'Error';
    // }

    let baseUrl = "http://localhost:3030/jsonstore/bus/businfo";
    let inputElement = document.getElementById("stopId");
    let uElements = document.getElementById("buses");

    let divElement = document.getElementById("stopName");

    fetch(`${baseUrl}/${inputElement.value}`)
        .then(response => {
            if (response.status !== 200) {
                throw new Error();
            }

            return response.json()
        })
        .then(data => {
            let buses = data.buses;
            let stopName = data.name;

            divElement.textContent = stopName;
            uElements.innerHTML = "";
            Object.keys(buses).forEach((bus) => {
                let liElement = document.createElement("li");
                liElement.textContent = `Bus ${bus} arrives in ${buses[bus]} minutes`;
                uElements.appendChild(liElement);
            });
        })
        .catch(error => {
            divElement.textContent = "Error";
            uElements.innerHTML = "";
        });
}

