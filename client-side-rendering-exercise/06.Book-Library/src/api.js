let host = 'http://localhost:3030';

async function request(method, url, data) {
    let options = {
        method,
        headers: {}
    }

    if (data != undefined) {
        options.headers['Content-Type'] = "application/json";
        options.body = JSON.stringify(data);
    }

    try {
        let response = await fetch(host + url, options);

        if (!response.ok) {
            let error = await response.json();
            throw new Error(error.message);
        }

        let data = await response.json();

        return data;

    } catch (error) {
        alert(error);
        throw error;
    }
}

let get = request.bind(null, 'get');
let post = request.bind(null, 'post');
let put = request.bind(null, 'put');
let del = request.bind(null, 'delete');

export {
    get,
    post,
    put,
    del as delete
}