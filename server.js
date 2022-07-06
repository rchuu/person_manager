const express = require('express');
const cors = require('cors');
const app = express();

require('./server/config/mongoose.config');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

require('./server/routes/person.routes')(app);
app.listen(8000, () => {
    console.log("Server is running on port 8000");
})