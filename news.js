const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('d910f6e9c0b04462bfec49435efb1eb8');

module.exports = function (app) {
    app.get('/news', (req, res) => {
        console.log(req.query.string + " " + req.query.date)
        if (req.query.string && req.query.date) {
            newsapi.v2.everything({
                q: `${req.query.string}`,
                //sources: 'bbc-news,the-verge',
                //domains: 'bbc.co.uk, techcrunch.com',
                from: `${req.query.date}`,
                //to: '2017-12-12',
                language: 'en',
                sortBy: 'relevancy',
              }).then(response => {
                //console.log(response);
                res.status(200).send(response.articles);
              });
            /*var url = 'http://newsapi.org/v2/everything?' +
                `q=${req.query.string}&` +
                `from=${req.query.date}&` +
                'sortBy=popularity&' +
                'apiKey=d910f6e9c0b04462bfec49435efb1eb8';

            var req = new Request(url);
            let news;
            fetch(req)
                .then(function (response) {
                    console.log(response.json()
                    .then(function (data) {
                         news = data.articles.map(function (x) {
                            return {
                              'urlToImage': x.urlToImage,
                              'title': x.title,
                              'description': x.description,
                              'url': x.url
                            }
                          })
                    })
                    );
                })
            res.status(200).send(news);*/
        } else {
            res.status(400).send('error no se mando nada');
        }
    });
};