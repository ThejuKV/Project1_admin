const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql')
const cors = require('cors')
const app = express();
const { v4: uuidv4 } = require('uuid');
const port = 8084;
app.use(cors());
app.use(bodyParser.json());
const db = require('./db');



//To generate 16-digits user ID automatically
function generateHexadecimalId() {
    const uuid = uuidv4();
    const hexadecimalId = uuid.replace(/-/g, '');
    return hexadecimalId;
}




//To store the data into the table
app.post('/api/postdataregister', (req, res) => {
    const data = req.body;
    console.log('Data received from frontend:', data);
    const userid = generateHexadecimalId();
    const { label, field } = data;
    const sql = 'INSERT INTO user_fields_register (user_id, label, field) VALUES (?,?,?)';
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




//To fetch the data from the database
app.get('/api/getfields', (req, res) => {
    db.query('SELECT * FROM user_fields_register', (err, results) => {
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



//To delete the entire row from the table
app.delete('/api/deleteRow/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    const sql = 'DELETE FROM user_fields_register WHERE user_id = ?';

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
app.put('/api/updateCheckboxRegister/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const { checkbox } = req.body;

    const sql = 'UPDATE user_fields_register SET checkbox = ? WHERE user_id = ?';
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
app.get('/api/getCheckboxStatusRegister/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    const sql = 'SELECT checkbox FROM user_fields_register WHERE user_id = ?';
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




//display in register page
app.get('/api/getCheckedFieldsRegister', (req, res) => {
  const sql = 'SELECT * FROM user_fields_register WHERE checkbox = 1';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching checked fields from MySQL:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('Checked fields retrieved from MySQL');

      const checkedFieldsArray = [];

      results.forEach((row) => {
        const fieldObject = {
          label: row.label,
          inputType: row.field,
          userID: row.user_id,
        };
        checkedFieldsArray.push(fieldObject);
      });
      res.status(200).json(checkedFieldsArray);
    }
  });
});






//To start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});