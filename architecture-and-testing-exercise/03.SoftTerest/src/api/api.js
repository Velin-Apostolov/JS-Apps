const baseUrl = 'http://localhost:3030';

async function request(method, url, data) {
    const options = {
        method: method,
        headers: {}
    }

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const user = JSON.parse(localStorage.getItem('userData'));

    if (user) {
        const token = user.accessToken;
        options.headers['X-Authorization'] = token;
    }

    try {
        const response = await fetch(baseUrl + url, options);

        if (!response.ok) {
            if (response.status == 403) {
                localStorage.removeItem('userData');
            }
            let error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }
    } catch (error) {
        alert(error);
        throw error;
    }

}

const get = request.bind(null, 'get');
const post = request.bind(null, 'post');
const put = request.bind(null, 'put');
const del = request.bind(null, 'delete');

export {
    get,
    post,
    put,
    del as delete
};