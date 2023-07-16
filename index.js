// express declaration
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandling = require('./src/middlewares/errorHandling');
// this web application is working on port 8000
const port = 8080;
// database
const db = require('./src/config/mongoose');
const app = express();
app.use(cors());


// urlencodede is used to create body object to the reqest url
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',require('./src/api/routes/index'));
app.use(errorHandling.errorHandling);
app.listen(port,function(err){
    
    console.log(`Success in connectin the server on port:${port}`);
})