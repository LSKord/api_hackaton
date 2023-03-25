const express = require('express');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true,}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.json({ mike: "dev" });
});

/* Rutas */
app.use(require('./routes'));

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`ApiPlantillas listening at http://localhost:${port}`);
});