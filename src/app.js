require('sweetalert');
const $ = require('cheerio');

function onInit() {
    let url = 'http://192.168.1.35:5000';
    getMatches(url);
}

function getMatches(url) {
    fetch(url)
        .then(e => e.text())
        .then(html => {
            let innerHtml = "";
            $('.mobile-team', html)
                .filter((i, el) => {
                    return $(el).attr('class') !== "banner mobile-team";
                })
                .map((i, el) => {
                    let provideImage = $('.provider-image > img', el).attr('src').trim();
                    let sportIcon = $('.sport-icon > img', el).attr('src').trim();
                    let matchTime = $('.match-time > span', el).text().trim();
                    let teams = $('.teams > a > span', el).text().trim();
                    let competition = $('.competition', el).text().trim();

                    innerHtml += `<div class="col-10 offset-1" style="padding: 1%">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-2">
                                                    <img src="${sportIcon}" alt="sportIcon">
                                                </div>
                                                <div class="col-2">${matchTime}</div>
                                                <div class="col-6">
                                                    <h5>${teams}</h5>
                                                    <p style="color: slategray">${competition}</p>
                                                </div>
                                                <div class="col-2">
                                                    <img src="${provideImage}" alt="sportIcon">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
                });
            document.getElementById('matches').innerHTML = innerHtml;
        })
        .catch(error => console.log(error.toString()));
}

function onSweetClicked() {
    swal("Hi!", "Spor Ekrani");
}

