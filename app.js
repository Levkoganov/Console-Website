// DEPENDENCIES
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const expressLayOuts = require('express-ejs-layouts');
require('dotenv').config();

// ROUTERS
const homeRouter = require('./routes/home');
const xboxRouter = require('./routes/xbox');
const ps4Router = require('./routes/ps4');
const authRouter = require('./routes/auth');
const settingRouter = require('./routes/setting');
const errorRouter = require('./routes/error');
require('./config/mongoose');

const app = express();

// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(expressLayOuts);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.ACCESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

// Global FLASH VARS
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

app.use(express.static('public'));

// ROUTER PATH
app.use('/', homeRouter);
app.use('/xbox', xboxRouter);
app.use('/ps4', ps4Router);
app.use('/auth', authRouter);
app.use('/setting', settingRouter);
app.use(errorRouter);

module.exports = app;
