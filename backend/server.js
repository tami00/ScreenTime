const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
// const Role = db.role;

app.use('/uploads', express.static('uploads'));

db.mongoose
  .connect(`mongodb+srv://tami00:MEUxClWqUNbLz359@cluster0.gmvao.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    // initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.use('/api/favourite', require('./app/routes/favourite.routes'));
app.use('/api/review', require('./app/routes/review.routes'));
app.use('/api/sentiment', require('./app/routes/sentiment-analysis.routes'));
app.use('/api/futureFilms', require('./app/routes/futureFilms.routes'));
app.use('/api/watchlist', require('./app/routes/notification.routes'));
app.use('/api/portfolio', require('./app/routes/portfolio.routes'));
app.use('/api/parser', require('./app/routes/parser.routes'));
app.use('/api/recommender', require('./app/routes/recommender.routes'));
// routes
// require(".app/routes/favourite.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: "user"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'user' to roles collection");
//       });

//       new Role({
//         name: "creator"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'creator' to roles collection");
//       });

//       new Role({
//         name: "watcher"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'watcher' to roles collection");
//       });
//     }
//   });
// }
