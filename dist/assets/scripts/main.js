let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1;
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();
let fecha = year + "-" + month + "-" + day;
const HTTTPMethods = {
    "put": "PUT",
    "post": "POST",
    "get": "GET",
    "delete": "DELETE"
};
const APIURL = window.location.protocol + '//' + window.location.host;
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
function sendHTTPRequest(urlAPI, data, method, cbOK, cbError, authToken) {
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar:  PUT actualizar archivo
    xhr.open(method, urlAPI);
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    if (authToken)
        xhr.setRequestHeader('x-auth-user', authToken);
    // 4. Enviar solicitud al servidor
    xhr.send(data);
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200 && xhr.status != 201) { // analizar el estatus de la respuesta HTTP 
            // Ocurrió un error
            cbError(xhr.status + ': ' + xhr.statusText);
        }
        else {
            //console.log(xhr.responseText); // Significa que fue exitoso
            cbOK({
                status: xhr.status,
                data: xhr.responseText
            });
        }
    };
}
let btnSrch = document.getElementById('btnsearch');
btnSrch.addEventListener('click', function () {
    let inputSrch = document.getElementById('inputsearch').value;
    //console.log(inputSrch);
    let stringNew = inputSrch.toUpperCase();
    let apiURL = APIURL + `/news?string=${stringNew}&date=${fecha}`;
    sendHTTPRequest(apiURL, null, HTTTPMethods.get, (res) => {
        let news = JSON.parse(res.data);
        //console.log(JSON.parse(res.data));
        card.innerHTML = cardHTML;
        console.log(news);
        const item = document.getElementById('card').innerHTML;
        const template = Handlebars.compile(item);
        document.getElementById('card').innerHTML = template({
            news: news
        });
        /*fetch(req)
        .then(function (response) {
          response.json()
            .then(function (data) {
              let news = data.articles.map(function (x) {
                return {
                  'urlToImage': x.urlToImage,
                  'title': x.title,
                  'description': x.description,
                  'url': x.url
                }
              })
    
              card.innerHTML = cardHTML;
              console.log(news);
              const item = document.getElementById('card').innerHTML;
              const template = Handlebars.compile(item);
              document.getElementById('card').innerHTML = template({
                news: news
              });
    
            });
        });*/
    }, (err) => {
        console.log('error fatal' + err);
    }, null);
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
