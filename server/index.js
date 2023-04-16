const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000/',
    credentials: true
}));

const session = require('express-session');
app.use(session({
    secret: "konnectedsessionsecret",
    resave: true,
    saveUninitialized: true
}));

// Storage through Multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()) + '-' + file.originalname
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage })

// Routes
const auth_route = require('./routes/authRoute');
const user_route = require('./routes/userRoute');
const bt_route = require('./routes/btRoute');
const note_route = require('./routes/noteRoute');
const topic_route = require('./routes/topicRoute');
const level_route = require('./routes/levelRoute')


// Using path to route
app.use("/api/auth",auth_route);

app.use("/api/books",bt_route);
app.use("/api/book",bt_route);

app.use("/api/topics",topic_route);

app.use("/api/levels",level_route);

// Listening server in port 5000
app.listen(5000, (req,res)=>{
    console.log("Starting server now!");
});