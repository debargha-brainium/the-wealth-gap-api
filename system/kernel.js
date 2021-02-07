const config = global.config;
const app = require("../server");

require('../utility/helpers');
require('dotenv').config();

//connect to database
require('../database/connector').connect(true);

const cors = require('cors');
app.use(cors());

const helmet = require('helmet');
app.use(helmet());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(function (err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        res.status(400).send({status: false, message: "Bad Request"});
    } else next();
});

