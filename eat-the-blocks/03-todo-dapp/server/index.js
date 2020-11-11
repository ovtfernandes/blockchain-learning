const express = require('express');

app = express();

app.use(express.static('./app'));
app.use(express.static('../build/contracts'));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/app/index.html`);
});

app.get('*', (req, res) => {
    res.status(404).send('Oooops... This URL does not exist');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`ETB Ethereum ToDo List DAPP is running on port ${PORT}`);
});
