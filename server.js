const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(`${__dirname}/views/partials`); // creates partials available inside partials folder
app.set('view engine', 'hbs'); // we use the hbs engine

app.use((req, res, next) => { // we use middleware to check or do some things before we continue
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', err => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next(); // next() is the command which tell the app to continue
});

// app.use((req, res, next) => { // middlewars without next() will stop at the end of them and wont continue
//     res.render('maintenance.hbs');
// });

app.use(express.static(`${__dirname}/public`)); // makes all the files in public folder accessable

hbs.registerHelper('getCurrentYear', () => { // creates helper to print current year
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => { // creates helper to print an upperCase string
    return text.toUpperCase();
});

app.get('/', (req, res) => { // declare the route '/' to render home.hbs page with those arguments
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website!'
    });
});

app.get('/about', (req, res) => { // declare the route '/about' to render about.hbs page with those arguments
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/maintenance', (req, res) => { // declare the route '/maintenance' to render maintenance.hbs page with those arguments
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance Page'
    });
});

app.get('/bad', (req, res) => { // declare the route '/bad' to print a JSON object
    res.send({
        errorMessage: 'Unable to fulfill this request.'
    });
});

// app.get('/', (req, res) => { // declare the route '/' to print an HTML or JSON object
//     // res.send('<h1>Hello Express!</h1>');
//     res.send({
//         name: 'Or',
//         likes: [
//             'Computers',
//             'Movies'
//         ]
//     });
// });

app.listen(port, () => { // opens the server
    console.log(`Server is up on port ${port}`);
});