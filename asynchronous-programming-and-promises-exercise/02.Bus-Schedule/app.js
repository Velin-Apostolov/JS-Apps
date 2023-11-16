function solve() {
    let span = document.querySelector('.info');
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    let stopId = 'depot';
    let busStop = '';
    let url = `http://localhost:3030/jsonstore/bus/schedule/${stopId}`;

    function depart() {

        fetch(url)
        .then(response => {
            if (!response.ok) {
                let error = new Error();
                error.status = response.status;
                error.statusText = response.statusText;
                throw error;
            } else {
                return response.json();
            }
        }).then(data => {
            departBtn.setAttribute('disabled', true);
            arriveBtn.removeAttribute('disabled');
            busStop = data.name;
            span.textContent = `Next stop ${busStop}`;
            stopId = data.next;
            url = `http://localhost:3030/jsonstore/bus/schedule/${stopId}`;

        }).catch(error => {
            departBtn.setAttribute('disabled', true);
            arriveBtn.setAttribute('disabled', true);
            span.textContent = 'Error'; 
        })

    }

    function arrive() {
        span.textContent = `Arriving at ${busStop}`;
        arriveBtn.setAttribute('disabled', true);
        departBtn.removeAttribute('disabled');
    }

    return {
        depart,
        arrive
    };
}

let result = solve();