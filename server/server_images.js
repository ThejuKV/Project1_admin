const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const multer = require('multer');
const port = 8086;
const { v4: uuidv4 } = require('uuid');
app.use(cors());
app.use(bodyParser.json());
const db = require('./db');



//To generate 16-digits user ID automatically
function generateHexadecimalId() {
    const uuid = uuidv4();
    const hexadecimalId = uuid.replace(/-/g, '');
    return hexadecimalId;
}




//To store the image file in the uploads folder
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/uploads');
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + '-' + file.originalname);
//     },
// });
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

app.post('/api/postdataImage', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const data = req.body;
    const file = req.file.filename;
    console.log('Data received from frontend:', data);
    console.log('file:', file);

    const ImageId = generateHexadecimalId();
    const { ImageType, ImagePlace, DisplayPage } = data;
    const sql = 'INSERT INTO user_images (Image_id, ImageType, Url, ImagePlace, DisplayPage) VALUES (?,?,?,?,?)';
    const values = [ImageId, ImageType, file, ImagePlace, DisplayPage];
    console.log('Data received from frontend:', values);
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
                    ImagePlace: row.ImagePlace,
                    DisplayPage: row.DisplayPage,
                };
                fieldsArray.push(fieldObject);
            });
            res.status(200).json(fieldsArray);
        }
    });
});



//To delete the entire row from the table
app.delete('/api/deleteImage/:image_id', (req, res) => {
    const ImageId = req.params.image_id;

    const sql = 'DELETE FROM user_images WHERE image_id = ?';

    db.query(sql, ImageId, (err, result) => {
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
app.put('/api/updateCheckboxImages/:Image_id', (req, res) => {
    const ImageId = req.params.Image_id;
    const { checkbox } = req.body;

    const sql = 'UPDATE user_images SET checkbox = ? WHERE Image_id = ?';
    const values = [checkbox, ImageId];

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
app.get('/api/getCheckboxStatusImages/:Image_id', (req, res) => {
    const ImageId = req.params.Image_id;

    const sql = 'SELECT checkbox FROM user_images WHERE Image_id = ?';
    const values = [ImageId];

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





//display in image preview page
app.get('/api/getCheckedFieldsImages', (req, res) => {
    const sql = 'SELECT * FROM user_images WHERE checkbox = 1';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching checked fields from MySQL:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log('Checked fields retrieved from MySQL');

            const checkedFieldsArray = [];

            results.forEach((row) => {
                const fieldObject = {
                    ImageId: row.Image_id,
                    ImageType: row.ImageType,
                    Url: row.Url,
                    ImagePlace: row.ImagePlace,
                    DisplayPage: row.DisplayPage,

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