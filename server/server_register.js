const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql')
const cors = require('cors')
const app = express();
const { v4: uuidv4 } = require('uuid');
const port = 8084;
app.use(cors()); 
app.use(bodyParser.json());

function generateHexadecimalId() {
  const uuid = uuidv4(); // Generate a UUID
  const hexadecimalId = uuid.replace(/-/g, ''); // Remove hyphens and convert to hexadecimal
  return hexadecimalId;
}

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

app.post('/api/postdataregister', (req, res) => {
  const data = req.body;
  console.log('Data received from frontend:', data);
  const userid = generateHexadecimalId();
   const { label, field } = data;
  const sql = 'INSERT INTO user_fields_register (user_id,label, field) VALUES (?,?,?)';
  const values = [userid,label,field];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('Data inserted into MySQL');
      res.status(200).json({ message: 'Data inserted successfully' });
    }
  });

  // res.status(200).json({ message: 'Data received successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});










