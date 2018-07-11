// chrome://inspect/#devices
// node --inspect index.js
// node --inspect-brk index.js

var getJSON = require('get-json')

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


con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  const execQuery = (sql, params) => new Promise((resolve, reject) => {
    con.query(sql, params, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });


  function downloadJsonAsTable(url) {
    var begin = url.lastIndexOf("/")
    var tableName = url.substring(begin + 1)

    getJSON(url,
        function (error, response) {
          if (error) { throw err; }

          //console.log("response.result", response.G);
          const relevant_response = response.G;

          for (let property1 in relevant_response) {
            if (relevant_response.hasOwnProperty(property1)) {
              const record = relevant_response[property1];
              console.log(record);

              var query = "CREATE TABLE `" + tableName + "` (\n"
              query += "`kiestze_id` int(11) NOT NULL AUTO_INCREMENT,\n"
              for (let columnName in record) {
                if (record.hasOwnProperty(columnName)) {
                  const columnValue = record[columnName];
                  let type = null;
                  if (typeof columnValue == "number")
                    type = "int(11)"
                  else if (typeof columnValue == "string")
                    type = "varchar(45)"
                  if (type)
                    query += "  `" + columnName + "` " + type + " NOT NULL,\n";

                }
              }
              query += "PRIMARY KEY (`kiestze_id`),\n"
              query += "UNIQUE KEY `kiestze_id_UNIQUE` (`kiestze_id`)\n"
              query += ") ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='" + url + "'\n"
              console.log("query:", query);

              try {
                //execQuery("IF OBJECT_ID(`emiles1q_kiest_ze`.`"+tableName+"`, 'U') IS NOT NULL \n"
                let tmp = execQuery("DROP TABLE `emiles1q_kiest_ze`.`" + tableName + "`");
                tmp.catch(function () {
                  console.log("Promise Rejected");
                })
              } catch (e) { } // if table didn't exist
              let test = execQuery(query);
              console.log(test);

              process.exitCode = 1;
              break; // only take first value.
            }
          }

          for (let property1 in relevant_response) {
            if (relevant_response.hasOwnProperty(property1)) {
              const record = relevant_response[property1];

              let query = "INSERT INTO `emiles1q_kiest_ze`.`" + tableName + "` VALUES \n(0 "; // 0 for the kiestze_id

              for (let columnName in record) {
                if (record.hasOwnProperty(columnName)) {

                  const columnValue = record[columnName];

                  if (typeof columnValue == "number")
                    query += "," + columnValue;
                  else if (typeof columnValue == "string")
                    query += "," + '"' + columnValue + '"';
                }
              }
              query += ")";
              let test = execQuery(query);
            }
          }

        })
  }
  //downloadJsonAsTable('https://vlaanderenkiest.be/verkiezingen2012/2012/gemeente/overzicht.json')
  //downloadJsonAsTable('https://vlaanderenkiest.be/verkiezingen2012/2012/gemeente/gewestelijkeLijsten.json') // 431 items, takes a minute to upload
  //downloadJsonAsTable('https://vlaanderenkiest.be/verkiezingen2012/2012/gemeente/23050/entiteitUitslag.json')
  downloadJsonAsTable('https://vlaanderenkiest.be/verkiezingen2012/2012/gemeente/23060/2/uitslag.json') // has a strange sctructure
  // There are some other requests too

})





console.log("Thank you for using scraper!");
