// chrome://inspect/#devices
// node --inspect index.js

var mysql = require('mysql');

var fs = require('fs');
var array = fs.readFileSync('password.txt').toString().split("\n");
var password = array[0];

var con = mysql.createConnection({
  host: "emilesonneveld.be",
  user: "emiles1q_kiest_ze",
  password: password,
  database: "emiles1q_kiest_ze"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});

console.log("Thank you for using scraper!");
