const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/task');
const PORT = process.env.PORT || 8000;

const app = express();

mongoose.connect('MONGODB_URL_HERE', (err) => {
	if (err) throw err;
	console.log('connected to db');
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/api', taskRoutes);

app.listen(PORT, () => {
	console.log(`working on port ${PORT}`);
});
