import env from "../environment";
import express = require('express');
import api = require('../routers/api');
import mongoose from 'mongoose';
import * as bodyParser from "body-parser";
import cors = require('cors');

// Create a new express app instance
const app: express.Application = express();
const mongoUrl: string = 'mongodb://localhost/node';
mongoose.connect(
  mongoUrl, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

const apiRouters: api.Api = new api.Api();
app.use(cors());
// support application/json type post data
app.use(bodyParser.json());
//support application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));

apiRouters.route(app);

app.listen(env.getPort(), function () {
  console.log('App is listening on port ' + env.getPort() + '!');
});
