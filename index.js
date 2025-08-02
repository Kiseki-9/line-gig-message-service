const express = require('express');
const { resolve } = require('path');
const pushRoutes = require('./server'); // import your API route

const app = express();
const port = 3010;

app.use(express.json());
app.use(express.static('static'));
app.use('/api', pushRoutes); // all /api/* routes handled by server.js

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
