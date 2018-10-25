require('sweetalert');
const $ = require('cheerio');

getDays("URL");

function getDays(url) {


    let loadingElement = document.getElementById("loading");
    document.getElementById('matches').innerHTML = "";
    loadingElement.style.display = "flex";


    fetch(url)
        .then(e => e.text())
        .then(html => {
            let innerHtml = `<ul class="nav nav-tabs justify-content-center">`;
            $('li.change-day-trigger ', html)
                .map((i, el) => {

                    let className = $(el).attr('class');
                    let dayUrl = $('a', el).attr('href').trim();
                    let dayNumber = $('.day-number', el).text().trim();
                    let dayOfWeek = $('.day-of-week', el).text().trim();

                    innerHtml += `<li class="nav-item">
                                        <a class="nav-link ${className}" href="#" onclick="getDays('${dayUrl}')">
                                            ${dayNumber}
                                            <small> ${dayOfWeek}</small>
                                        </a>
                                      </li>`

                });
            innerHtml += `</ul>`;
            document.getElementById('days').innerHTML = innerHtml;


        })
        .then(() => {
            getMatches(url)
                .then(() => loadingElement.style.display = "none")
        })
        .catch(error => {
            swal(error.toString())
        })
}


function getMatches(url) {
    return fetch(url)
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

                    innerHtml += `<div class="col-lg-6" style="padding: 1%">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-2">
                                                    <img src="${sportIcon}" alt="sportIcon">
                                                </div>
                                                <div class="col-2">
                                                    <h6>${matchTime}</h6>
                                                </div>
                                                <div class="col-6">
                                                    <h6>${teams}</h6>
                                                    <p style="color: slategray; font-size: small">${competition}</p>
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
        .catch(error => swal(error.toString()));
}

