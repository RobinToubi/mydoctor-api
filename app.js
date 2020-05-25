const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const cors = require("cors");

// ROUTES
const userRoutes = require("./routes/userRoutes");
const dossierRoutes = require("./routes/dossierRoutes");
const interventionRoutes = require("./routes/interventionRoutes"); 

// CONFIG
const PORT = process.env.PORT;

// INIT EXPRESS
const app = express();

// MONGO URL
const MONGO_URL = "mongodb://localhost:27017/mydoctor";

// SECURITY MIDDLEWARES
app.use(helmet());

// Limitation des requêtes effectuées
// app.use(
//   rateLimit({
//     windowMs: 1000 * 60 * 15, // 15 minutes
//     max: 1000 // 100 requests/15min
//   })
// );

// MIDDLEWARES
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// CONNECT TO DB
mongoose.connect(
  MONGO_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  err => {
    if (!err) {
      console.log(`MongoDB Connection Succeeded to db = ${MONGO_URL}`);
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// ADD ROUTES
app.use(userRoutes);
app.use(interventionRoutes);
app.use(dossierRoutes);

// START THE SERVER
app.listen(9000, () => console.log(`Server listening on port 9000`));