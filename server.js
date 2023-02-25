
// Simple check to see if we're running in
// a production environment or not.
// Here, we only want load the .env file
// in a development envrionment.
// --------------------------------------------------------
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};


const express = require('express');
const app = express();

// layout & ejs
// --------------------------------------------------------
// Enable the use of a 'layout' to wrap 'views' in HTML.
// Layouts (template) define the overall structure of pages.
// Contains basic HTML structure + ejs placeholders.
// The ejs placeholders will be filled with contents
// of the corresponding ejs files from the 'views'
// directory.
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
// Set ejs as view engine
app.set('view engine', 'ejs');
// Set the directory where views are located.
// Views directory stores individual ejs files.
app.set('views', __dirname + '/views');
// Sets the path of the layout/template file.
// If '__dirname' is omitted and '/layouts/layout' is used 
// as the path for app.set('layout', ...), it would assume 
// that the layouts directory is located INSIDE the views 
// directory.
app.set('layout', 'layouts/layout');


// mongoose
// --------------------------------------------------------
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
// Connect to a database url defined in the env file.
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
// Triggered every time when there's an error connecting
// to database.
db.on('error', error => console.log(error));
// Triggered only once when connection is successfully
// established.
db.once('open', () => console.log('Connected to Mongoose'));


// routes
// --------------------------------------------------------
// Use the route instance in index.js.
const indexRouter = require('./routes/index');
app.use('/', indexRouter);
// Create route for static files.
app.use(express.static('public'));


// port
// --------------------------------------------------------
app.listen(process.env.PORT || 3000);