const app = require('express')();
const bodyParser = require('body-parser');
const courseRouter = require('./api/routes/courseRoute');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const port = process.env.port || 3000;

app.use(morgan('dev'));
app.use(cors());
mongoose
  .connect('mongodb://localhost/eduShare', { useNewUrlParser: true })
  .then(() => console.log('database connection established'))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS,'
  );
  next();
});
app.use('/api', courseRouter);
app.use('/', (req, res, next) => res.send('eduShare backend working'));

app.listen(port);
