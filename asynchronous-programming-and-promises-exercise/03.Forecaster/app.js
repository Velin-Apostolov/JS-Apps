function attachEvents() {
    let symbolMap = new Map();
    symbolMap.set('Sunny', '&#x2600;');
    symbolMap.set('Partly sunny', `&#x26C5`);
    symbolMap.set('Overcast', `&#x2601;`);
    symbolMap.set('Rain', `&#x2614;`);
    symbolMap.set('Degrees', `&#176;`);
    let submitBtn = document.getElementById('submit');
    let mainDiv = document.getElementById('forecast');
    let current = document.getElementById('current');
    let upcoming = document.getElementById('upcoming');
    let url = 'http://localhost:3030/jsonstore/forecaster/locations';

    submitBtn.addEventListener('click', () => {

        let location = document.getElementById('location').value;

        fetch(url)
        .then(response => {
            if (response.status != 200) {
                let error = new Error();
                error.status = response.status;
                error.statusText = response.statusText;
                throw error;
            } else {
                return response.json();
            } 
        }).then(data => {
            let inputCheck = data.find((area) => area.name == location);
            if (inputCheck) {
                // can be done via outer func
                let code = inputCheck.code;
                fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`)
                .then(response => {
                    if (response.status != 200) {
                        let error = new Error();
                        error.status = response.status;
                        error.statusText = response.statusText;
                        throw error;
                    } else {
                        return response.json();
                    }  
                }).then(data => {
                    mainDiv.style.display = 'block';
                    let condition = data.forecast.condition;
                    let high = data.forecast.high;
                    let low = data.forecast.low;
                    let name = data.name;

                    let forecastDiv = document.createElement('div');
                    forecastDiv.classList.add('forecasts');

                    let symbolSpan = document.createElement('span');
                    symbolSpan.className = 'condition symbol';
                    symbolSpan.innerHTML = `${symbolMap.get(condition)}`;
                    forecastDiv.appendChild(symbolSpan);
                    let dataSpan = document.createElement('span');
                    dataSpan.classList.add('condition');

                    let nameSpan = document.createElement('span');
                    nameSpan.className = 'forecast-data';
                    nameSpan.textContent = name;
                    dataSpan.appendChild(nameSpan);

                    let degreeSpan = document.createElement('span');
                    degreeSpan.classList.add('forecast-data');
                    degreeSpan.innerHTML = `${low}${symbolMap.get('Degrees')}/${high}${symbolMap.get('Degrees')}`;
                    dataSpan.appendChild(degreeSpan);

                    let conditionSpan = document.createElement('span');
                    conditionSpan.classList.add('forecast-data');
                    conditionSpan.textContent = condition;
                    dataSpan.appendChild(conditionSpan);

                    forecastDiv.appendChild(dataSpan);
                    current.appendChild(forecastDiv);

                }).catch(error => {
                    mainDiv.style.display = 'block';
                    mainDiv.textContent = 'Error';
                })
                fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
                .then(response => {
                    if (response.status != 200) {
                        let error = new Error();
                        error.status = response.status;
                        error.statusText = response.statusText;
                        throw error;
                    } else {
                        return response.json();
                    }
                }).then(data => {
                    let forecastInfoDiv = document.createElement('div');
                    forecastInfoDiv.classList.add('forecast-info');

                    for (const day of data.forecast) {
                        let condition = day.condition;
                        let high = day.high;
                        let low = day.low;

                        let mainSpan = document.createElement('span');
                        mainSpan.classList.add('upcoming');

                        let symbolSpan = document.createElement('span');
                        symbolSpan.classList.add('symbol');
                        symbolSpan.innerHTML = `${symbolMap.get(condition)}`;
                        mainSpan.appendChild(symbolSpan);

                        let degreesSpan = document.createElement('span');
                        degreesSpan.classList.add('forecast-data');
                        degreesSpan.innerHTML = `${low}${symbolMap.get('Degrees')}/${high}${symbolMap.get('Degrees')}`;
                        mainSpan.appendChild(degreesSpan);

                        let conditionSpan = document.createElement('span');
                        conditionSpan.classList.add('forecast-data');
                        conditionSpan.textContent = condition;
                        mainSpan.appendChild(conditionSpan);

                        forecastInfoDiv.appendChild(mainSpan);
                    }

                    upcoming.appendChild(forecastInfoDiv);

                }).catch(error => {
                    mainDiv.style.display = 'block';
                    mainDiv.textContent = 'Error';
                })
            } else {
                throw new Error();
            }
        }).catch(error => {
            mainDiv.style.display = 'block';
            mainDiv.textContent = 'Error';
        }) 

    });
}

attachEvents();