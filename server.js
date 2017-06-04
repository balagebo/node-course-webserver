const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.set('view engine', 'hbs');
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.url} ${req.method}`;
    fs.appendFile('log.txt', log + '\n');
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    response.render('home.hbs', {
        welcomeMessage: 'Mit keresel te itt???',
        title: 'Hóm pédzs'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'Öbáút pédzs'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'MEghaltál',
    });
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
