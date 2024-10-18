const express = require('express');
const bodyParser = require('body-parser');
const db = require('./src/config/db');
const cors = require('cors');

const app = express();
const PORT = 8081;

// CORS configuration to allow your frontend's URL
const corsOptions = {
  origin: 'http://labreservation.42web.io', // your frontend's URL
  methods: 'GET,POST',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Use CORS options
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, your server is up and running!');
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [result] = await db.execute('SELECT * FROM students WHERE email = ? AND password = ?', [email, password]);
    if (result.length > 0) {
      res.send('Success');
    } else {
      res.send('Invalid Credentials');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Signup route
app.post('/signup', async (req, res) => {
  const { email, password, ID, firstName, lastName, yearLevel } = req.body;
  try {
    await db.execute(
      'INSERT INTO students (id, email, password, firstname, lastname, yearlevel) VALUES (?, ?, ?, ?, ?, ?)',
      [ID, email, password, firstName, lastName, yearLevel]
    );
    res.send('User registered successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Route to check database connection
app.get('/test-db', async (req, res) => {
  try {
    const [result] = await db.execute('SELECT NOW()');
    res.send(`Database connected: ${result[0]['NOW()']}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database connection failed');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
