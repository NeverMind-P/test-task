const express  = require('express');
const app = express();
const port = process.env.PORT || 3000;
const middlewares = require('./models/middlewares');
const flash = require('connect-flash');
const session = require('express-session');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash()); 

app.use(session({ 
    secret: 'test',
	resave: true,
	saveUninitialized: true
}));



app.get('/', function(req, res) {
    res.render('signup.ejs', { message: req.flash('message') });
});

app.use(require('./routes/routes'));

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

try {
    app.listen(port, () => {
        console.log(`Server started on port: ${port}`);
    });
} catch (error) {
    console.log(error);
}