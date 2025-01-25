const dotenv = require('dotenv')
dotenv.config();

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const connectToDb = require('./config/database')

const userRoutes = require('./routes/user')
const captainRoutes = require('./routes/captain')
const mapsRoutes = require('./routes/maps.routes')
const rideRoutes = require('./routes/ride.routes')

connectToDb();

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true,
}));
app.use(cookieParser());

// app.get("/", (req, res) => {
//     res.send("Welcome to default route");
// })

// Define Routes
app.use('/users', userRoutes)
app.use('/captains', captainRoutes)
app.use('/maps', mapsRoutes)
app.use('/rides', rideRoutes)

module.exports = app;