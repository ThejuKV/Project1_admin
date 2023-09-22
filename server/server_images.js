const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql')
const cors = require('cors')
const app = express();
const port = 8086;
app.use(cors());
app.use(bodyParser.json());


//Connection to database
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


//To store the url data into the table
app.post('/api/postdataImage', (req, res) => {
    const data = req.body;
    console.log('Data received from frontend:', data);
    const {  ImageType, Url, ImagePlace, DisplayPage } = data;
    const sql = 'INSERT INTO user_images (ImageType,Url,ImagePlace,DisplayPage) VALUES (?,?,?,?)';
    const values = [ImageType, Url, ImagePlace, DisplayPage];

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


//To start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});