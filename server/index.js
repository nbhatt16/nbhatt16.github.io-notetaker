const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const apiRouter = require('./api');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', (_, res) => {
	const filePath = path.resolve(__dirname, '..', 'public', 'index.html');

	res.sendFile(filePath);
});

app.get('/notes', (_, res) => {
	const filePath = path.resolve(__dirname, '..', 'public', 'notes.html');

	res.sendFile(filePath);
});

app.use('/api', apiRouter);

app.use('*', (_, res) => {
	res.redirect('/');
});


app.listen(port, async () => {
	console.log(`Example app listening on port ${port}!`)
});
