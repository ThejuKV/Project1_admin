const mysql = require('mysql');

//Connecting to database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project1"
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});


module.exports = db;