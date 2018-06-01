const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/task');

const app = express();

mongoose.connect('mongodb://localhost:27017/tracker', (err) => {
	if (err) throw err;
	console.log('connected to db');
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/api', taskRoutes);

app.listen(8000, () => {
	console.log('working on port 3000');
});