document.addEventListener('DOMContentLoaded', function () {
    const firstContainer = document.getElementById('firstPosterContainer');
    const secondContainer = document.getElementById('secondPosterContainer');
    const bodyElement = document.querySelector('.bodyBack_Lee');

    function addPosterClickEvent(posterElement, pageNumber) {
        posterElement.addEventListener('click', function () {
            window.location.href = `/eunseok/eunSeokPage?pageNumber=${pageNumber}`;
        });
    }

    function createPosterBox(data, pageNumber) {
        const posterBox = document.createElement('div');
        posterBox.className = 'poster_Box';
        posterBox.innerHTML = `
        <div class="poster_Sub_Box">
            <div class="Back_img_poster" style="background-image: url('${data.esimageurl}');">
                <div>
                    <div class="Back_img_poster_Border"></div>
                </div>
            </div>
        </div>
        <p class="detail_Text">${data.estitle}</p>
        <div class="Data_day_Box">
            <div>
                <p class="font10">${data.esissue}</p>
            </div>
            <div class="Df Df_AC">
                <img src="/img/comment.svg" alt="" class="W16H16">
                <p class="font13">${data.esaccessor}</p>
            </div>
        </div>
    `;
        addPosterClickEvent(posterBox, pageNumber); // 클릭 이벤트 추가
        return posterBox;
    }

    function updatePosterContainer(firstContainer, secondContainer, data) {
        firstContainer.innerHTML = '';
        secondContainer.innerHTML = '';
        data.forEach((item, index) => {
            const pageNumber = index + 1;
            if (index < 4) {
                firstContainer.appendChild(createPosterBox(item, pageNumber));
            } else {
                secondContainer.appendChild(createPosterBox(item, pageNumber));
            }
        });
    }

    function updateBackgroundImage(category) {
        const backgroundImages = {
            EunSeok: "url('/img/softBG.svg')"
        };
        bodyElement.style.backgroundImage = backgroundImages[category];
    }

    function fetchAndDisplayData(category) {
        fetch('/eunseok/api/games')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data); // 데이터 로깅
                updatePosterContainer(firstContainer, secondContainer, data);
                updateBackgroundImage(category);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const category = this.getAttribute('data-category');
            fetchAndDisplayData(category);
        });
    });

    // 디폴트로 은석 데이터를 로드
    fetchAndDisplayData('EunSeok');
});