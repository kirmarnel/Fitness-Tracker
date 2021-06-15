const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require('compression');

const PORT = process.env.PORT || 3002;

const app = express();

app.use(logger("dev"));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/shrouded-waters-73586',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

app.use(require('./routes/htmlRoutes'));
app.use(require('./routes/apiRoutes'));


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});