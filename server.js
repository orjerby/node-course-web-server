const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(`${__dirname}/views/partials`); // creates partials available inside partials folder
app.set('view engine', 'hbs'); // we use the hbs engine

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', err => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(`${__dirname}/public`)); // makes all the files in public folder accessable

hbs.registerHelper('getCurrentYear', () => { // creates helper to print current year
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => { // creates helper to print an upperCase string
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website!'
    });
});

app.get('/about', (req, res) => { // we render dynamic html with express and hbs
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/maintenance', (req, res) => { // we render dynamic html with express and hbs
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance Page'
    });
});

app.get('/bad', (req, res) => { // we send HTML to the bad page
    res.send({
        errorMessage: 'Unable to fulfill this request.'
    });
});

// app.get('/', (req, res) => { // we send JSON to the root
//     // res.send('<h1>Hello Express!</h1>');
//     res.send({
//         name: 'Or',
//         likes: [
//             'Computers',
//             'Movies'
//         ]
//     });
// });

app.listen(3000, () => { // opens the server
    console.log('Server is up on port 3000');
});