var port = process.env.PORT || 8888;
var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
var app = require('express')();
var bodyParser = require('body-parser');
var doc = new GoogleSpreadsheet('1aVNGZKTV20RuaPTpeTE8UQ0p_gevxrxDKdD0-2HUS5U');
var creds = require('./credentials.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function record(err, data, sheet_id) {
    doc.getInfo(function (err, info) {
      sheet = info.worksheets[sheet_id];
      sheet.addRow(data, () => console.log("Recorded!"));
})};

app.post('/raw', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var data = ""
  try { data = JSON.parse(Object.keys(req.body)); }
  catch(err){ data = req.body;}
  console.log(data);
  res.json(data);
  doc.useServiceAccountAuth(creds, (err) => record(err, data, 0));
});

app.post('/complete', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var data = ""
  try { data = JSON.parse(Object.keys(req.body)); }
  catch(err){ data = req.body;}
  console.log(data);
  res.json(data);
  doc.useServiceAccountAuth(creds, (err) => record(err, data, 1));
});

// Expects data in form of application/x-www-form-urlencoded
app.listen(port, function() {});