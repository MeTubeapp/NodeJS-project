const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');
const template_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');



app.set('view engine', 'hbs');
//set folder name
app.set('views', template_path);
//hbs register partials
hbs.registerPartials(partials_path);


//for static web
app.use(express.static(publicPath));

//routing
app.get('/', (req, res) => {
    // res.send('hello from simple server :)');
    res.render('index');
});

app.get('/about', (req, res) => {
    // res.send('hello from about server :)');
    res.render('about');
});

app.get('/weather', (req, res) => {
    res.render('weather')

});

app.get('*', (req, res) => {
    res.render('error', {
        errormsg: 'Opps Page not found'
    });

});
app.get('/*/', (req, res) => {
    res.render('error');

});

app.listen(port);