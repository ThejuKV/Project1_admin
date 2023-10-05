// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');
// const cors = require('cors');
// const app = express();
// const { v4: uuidv4 } = require('uuid');
// const port = 8085;
// app.use(cors());
// app.use(bodyParser.json());
// const db = require('./db');

// function generateHexadecimalId() {
//     const uuid = uuidv4();
//     const hexadecimalId = uuid.replace(/-/g, '');
//     return hexadecimalId;
// }

// app.post('/api/saveData', (req, res) => {
//     const data = req.body;
//     const userid = generateHexadecimalId();
//     const sql = `
//       INSERT INTO register (Id, ${Object.keys(data).join(', ')})
//       VALUES (?, ${Object.keys(data).map(() => '?').join(', ')})
//     `;

//     const values = [userid, ...Object.values(data)]; 

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error(err);
//             res.status(500).json({ error: 'Error saving data' });
//         } else {
//             res.json({ message: 'Data saved successfully' });
//         }
//     });
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const { v4: uuidv4 } = require('uuid');
const port = 8085;
app.use(cors());
app.use(bodyParser.json());
const db = require('./db');

function generateHexadecimalId() {
    const uuid = uuidv4();
    const hexadecimalId = uuid.replace(/-/g, '');
    return hexadecimalId;
}

app.post('/api/saveData', (req, res) => {
    const data = req.body;
    const userid = generateHexadecimalId();

    // Construct SQL query dynamically
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = [userid, ...Object.values(data)];

    const sql = `
      INSERT INTO register (Id, ${columns})
      VALUES (?, ${placeholders})
    `;

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error saving data' });
        } else {
            res.json({ message: 'Data saved successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




























