const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const connectMongo = require("./config/connectDB");
connectMongo().catch((err) => console.log(err));
// Cấu hình Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Sử dụng routes
app.use('/', bookingRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
