const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql')
const cors = require('cors')
const app = express();
const { v4: uuidv4 } = require('uuid');
const port = 8082;
app.use(cors());
app.use(bodyParser.json());



//To generate 16-digits string for userID
function generateHexadecimalId() {
    const uuid = uuidv4();
    const hexadecimalId = uuid.replace(/-/g, '');
    return hexadecimalId;
}



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



//Storing data into database
app.post('/api/postdatalogin', (req, res) => {
    const data = req.body;
    console.log('Data received from frontend:', data);
    const userid = generateHexadecimalId();
    const { label, field } = data;
    const sql = 'INSERT INTO user_fields_login (user_id,label, field) VALUES (?,?,?)';
    const values = [userid, label, field];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log('Data inserted into MySQL');
            res.status(200).json({ message: 'Data inserted successfully' });
        }
    });
});



// Fetching the data
app.get('/api/getfields', (req, res) => {
    db.query('SELECT * FROM user_fields_login', (err, results) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log('Data retrieved from MySQL');

            const fieldsArray = [];

            results.forEach((row) => {
                const fieldObject = {
                    label: row.label,
                    inputType: row.field,
                    userID: row.user_id
                };

                fieldsArray.push(fieldObject);
            });
            res.status(200).json(fieldsArray);
        }
    });
});



//Deleting row 
app.delete('/api/deleteRow/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    const sql = 'DELETE FROM user_fields_login WHERE user_id = ?';

    db.query(sql, user_id, (err, result) => {
        if (err) {
            console.error('Error deleting data from MySQL:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log('Data deleted from MySQL');
            res.status(204).end();
        }
    });
});




//To update the checkbox column to "1" and "0"
app.put('/api/updateCheckboxLogin/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const { checkbox } = req.body;

    const sql = 'UPDATE user_fields_login SET checkbox = ? WHERE user_id = ?';
    const values = [checkbox, user_id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating checkbox status in MySQL:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log('Checkbox status updated in MySQL');
            res.status(200).json({ message: 'Checkbox status updated successfully' });
        }
    });
});




//even after the refresh
app.get('/api/getCheckboxStatusLogin/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    const sql = 'SELECT checkbox FROM user_fields_login WHERE user_id = ?';
    const values = [user_id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error fetching checkbox status from MySQL:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            const checkboxStatus = result[0] ? result[0].checkbox : 0;
            console.log('Checkbox status fetched from MySQL:', checkboxStatus);
            res.status(200).json({ checkbox: checkboxStatus });
        }
    });
});




//Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});