const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql')
const cors = require('cors')
const app = express();
const port = 8086;
const { v4: uuidv4 } = require('uuid');
app.use(cors());
app.use(bodyParser.json());



//To generate 16-digits user ID automatically
function generateHexadecimalId() {
    const uuid = uuidv4();
    const hexadecimalId = uuid.replace(/-/g, '');
    return hexadecimalId;
}



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
    const ImageId = generateHexadecimalId();
    const {  ImageType, Url, ImagePlace, DisplayPage } = data;
    const sql = 'INSERT INTO user_images (Image_id, ImageType, Url, ImagePlace, DisplayPage) VALUES (?,?,?,?,?)';
    const values = [ImageId, ImageType, Url, ImagePlace, DisplayPage];

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
app.get('/api/getImages', (req, res) => {
    db.query('SELECT * FROM user_images', (err, results) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log('Data retrieved from MySQL');

            const fieldsArray = [];

            results.forEach((row) => {
                const fieldObject = {
                    ImageId: row.Image_id,
                    ImageType: row.ImageType,
                    Url: row.Url,
                    ImagePlace :row.ImagePlace,
                    DisplayPage:row.DisplayPage,
                };
                fieldsArray.push(fieldObject);
            });
            res.status(200).json(fieldsArray);
        }
    });
});




//To start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});