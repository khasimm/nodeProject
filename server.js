const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
var app = express();
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}; ${req.url}; ${req.method}`;
    fs.writeFile('server.log', log + '\n');
    next();
});
/* app.use((req, res) => {
    res.render('maintenance.hbs');
}); */

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        contentText: 'Welcome Home'
    })
});

app.get('/bad', (req, res) => {
    var jsonStr = {
        errorMessage: 'Bad call!',
        name: 'Khasim'
    }
    res.send(jsonStr);
});
app.get('/about', (req, res) => {
  res.render('about.hbs', {
      pageTitle: 'About Page Screen'
  });  
})

app.listen(3000, () => {
    console.log('Server is up and running!');
});