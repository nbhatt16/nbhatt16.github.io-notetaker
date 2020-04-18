// This is what the requirements want

const express = require('express');
const path = require('path');
const shortid = require('shortid');
const fs = require('fs').promises;

const apiRouter = express.Router();

const dbFilePath = path.resolve(__dirname, '..', 'db', 'db.json');

async function readData() {
	const fileData = await fs.readFile(dbFilePath, 'utf-8');
	data = JSON.parse(fileData);

	return data;
}

apiRouter.get('/notes', async (_, res) => {
	const data = await readData();

	res.json(Object.values(data));
});

apiRouter.post('/notes', async (req, res) => {
	const data = await readData();

	const { title, text } = req.body;

	const id = shortid.generate();

	data[id] = {
		id,
		title,
		text
	};

	await fs.writeFile(dbFilePath, JSON.stringify(data));

	res.json({
		success: true
	});
});

apiRouter.delete('/notes/:id', async (req, res) => {
	let data = await readData();

	const noteId = req.params.id;

	if (data[noteId]) {
		delete data[noteId];
	}

	await fs.writeFile(dbFilePath, JSON.stringify(data));

	res.json({
		success: true
	});
});

module.exports = apiRouter;
