let port = process.env.PORT; // On Heroku this will be the PORT app can listen to. On local this will evaluate to null and thus 8000 will be used
if (port == null || port == "") {
  port = 3000;
}

const express = require('express');
const app = express();

//Enable CORS for all resources
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('static'));

app.get('/', function (req, res) {
  res.send("Jubin's server is alive");
});

const httpmethods = require('./routes/httpmethods');
app.use('/method', httpmethods);

const trace = require('./routes/trace');
app.use('/trace', trace);

app.listen(port, function () {
  console.log('Listening on port ' + port);
});