const express = require('express');
const app = express();
const port = 5000;

/** CONNECT TO DB */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on(
  'error',
  console.error.bind(console, 'connection error:')
);

db.once('open', () => {
  console.log(`You are connected to the DB.`);
});

/** ROUTERS */
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

app.listen(port, () => {
  console.log(
    `Blog-API app listening at http://localhost:${port}`
  );
});

/** MIDDLEWARES */
app.use(express.json({
  extended: false
}));

// CONTROLLER for the HOME ROUTE
const sayHello = (req, res) => {
  res.send({
    welcome: 'Welcome to the BLOG-API'
  });
};

/** HOME ROUTE */
app.get('/', sayHello);

// HOOK IN OUR ROUTERS (= CHILD APIs) into our main api (= app)
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

//ERROR
app.use((req, res, next) => {
  let error = new Error(
    `The route ${req.url} does not exist`
  );
  error.code = 404;
  next(error);
});

// GENERIC ERROR HANDLER MIDDLEWARE OF EXPRESS
// - this will kick in on every error that our CODE produced!
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      message: err.message,
    },
  });
});