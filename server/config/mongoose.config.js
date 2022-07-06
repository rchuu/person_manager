const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/persondb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Something went wrong when connecting to the database', err));