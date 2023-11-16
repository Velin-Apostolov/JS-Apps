export function spinner() {
    let element = document.createElement('p');
    element.innerHTML = 'Loading &#8230';
    return element;
}