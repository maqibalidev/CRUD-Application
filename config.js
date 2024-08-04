const mysql= require("mysql");


const conn = mysql.createConnection(
{
localhost:"localhost",
user:"root",
database:"school",
password:""

}

)

module.exports= conn;