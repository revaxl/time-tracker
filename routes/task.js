const { Router } = require('express');
const router = Router();
const Task = require('../models/task');

router.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find();
		res.status(200).json({ title: 'ok', tasks });
	} catch (error) {
		res.status(500).json({ title: 'error', error });
	}
});

router.post('/tasks', async (req, res) => {
	try {
		console.log(req.body);
		const task = new Task(req.body);
		await task.save();
		res.status(201).json({ title: 'created' });
	} catch (error) {
		res.status(500).json({ title: 'error', error });
	}
});

router.get('/tasks/:text', async (req, res) => {
	try {
		console.log(req.params);
		const tasks = await Task.find({$text: {$search: req.params.text}});
		res.status(200).json({ title: 'search ok', tasks });
	} catch (error) {
		res.status(500).json({ title: 'error', error });
	}
});

module.exports = router;