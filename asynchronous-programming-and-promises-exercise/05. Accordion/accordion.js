function solution() {
    let main = document.getElementById('main');
    let url = 'http://localhost:3030/jsonstore/advanced/articles/list';

    fetch(url)
    .then(response => response.json())
    .then(data => {
        for (const info of data) {
            let title = info.title;
            let id = info._id;

            let mainDiv = document.createElement('div');
            mainDiv.classList.add('accordion');

            let headDiv = document.createElement('div');
            headDiv.classList.add('head');

            let titleSpan = document.createElement('span');
            titleSpan.textContent = title;
            headDiv.appendChild(titleSpan);
            let showMoreBtn = document.createElement('button');
            showMoreBtn.textContent = 'More';
            showMoreBtn.classList.add('button');
            showMoreBtn.id = id;
            headDiv.appendChild(showMoreBtn);

            mainDiv.appendChild(headDiv);

            let extraDiv = document.createElement('div');
            extraDiv.classList.add('extra');
            extraDiv.style.display = 'none';

            let moreInfoPara = document.createElement('p');

            let moreInfoURL = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;

            fetch(moreInfoURL)
            .then(response => response.json())
            .then(data => {
                moreInfoPara.textContent = data.content;
            })

            extraDiv.appendChild(moreInfoPara);

            mainDiv.appendChild(extraDiv);

            main.appendChild(mainDiv);

            showMoreBtn.addEventListener('click', () => {
                if (showMoreBtn.textContent == 'More') {
                    showMoreBtn.textContent = 'Less';
                    extraDiv.style.display = 'block';
                } else {
                    showMoreBtn.textContent = 'More';
                    extraDiv.style.display = 'none';
                }
            })
        }
    })
}
solution();