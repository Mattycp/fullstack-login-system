require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

const PUBLIC_PATH = path.join(__dirname, '..', 'pages');
app.use(express.static(PUBLIC_PATH));

app.get('/', (req, res) => {
  res.sendFile(path.join(PUBLIC_PATH, '..', 'pages', 'login.html'));
});

app.use('/auth', require('./routes/auth'));

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));