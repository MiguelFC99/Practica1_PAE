let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1;
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();
let fecha = year + "-" + month + "-" + day;
console.log(fecha);
let cardHTML = `{{#each news}}
<div class="col-3"  id="cols">
    <div class="news-item">
        <img class="img-fluid" src="{{urlToImage}}"/>
        <h2>{{title}}</h2>
        <p>{{description}}</p>
        <a class="btn-primary p-1 m-1" href="{{url}}" target="_blank">Ver más</a>
    </div>
</div>
{{/each}}`;
let card = document.getElementById('card');
card.innerHTML = `<h5>Para buscar una noticia ingrese una palabra clave o un tema en espesifico</h5>`;
let btnSrch = document.getElementById('btnsearch');
btnSrch.addEventListener('click', function () {
    let inputSrch = document.getElementById('inputsearch').value;
    //console.log(inputSrch);
    let stringNew = inputSrch.toUpperCase();
    var url = 'http://newsapi.org/v2/everything?' +
        `q=${stringNew}&` +
        `from=${fecha}&` +
        'sortBy=popularity&' +
        'apiKey=d910f6e9c0b04462bfec49435efb1eb8';
    var req = new Request(url);
    fetch(req)
        .then(function (response) {
        response.json()
            .then(function (data) {
            let news = data.articles.map(function (x) {
                return {
                    'urlToImage': x.urlToImage,
                    'title': x.title,
                    'description': x.description,
                    'url': x.url
                };
            });
            card.innerHTML = cardHTML;
            console.log(news);
            const item = document.getElementById('card').innerHTML;
            const template = Handlebars.compile(item);
            document.getElementById('card').innerHTML = template({
                news: news
            });
        });
    });
});
function myFunction(x) {
    if (x.matches) { // If media query matches
        let cols = document.querySelectorAll('.col-3');
        for (const i of cols) {
            i.className = "col-12";
        }
    }
    else {
        let cols = document.querySelectorAll('.col-12');
        for (const i of cols) {
            i.className = "col-3";
        }
    }
}
var x = window.matchMedia("(max-width: 1024px)");
myFunction(x); // Call listener function at run time
x.addListener(myFunction);
