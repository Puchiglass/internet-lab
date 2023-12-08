const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// Устанавливаем view engine
app.set('view engine', 'ejs');
// Устанавливаем middleware для парсинга в формате URL-encoded
app.use(bodyParser.urlencoded({extended: true}));
// Обслуживание статических файлов из папки public
app.use(express.static('public'));

const routes = require('./requestHandlers');

app.use('/', routes);
app.use('/submit', routes);
app.use('/issues', routes);
app.use('/assignedTo', routes);
app.use('/allIssues', routes);
app.use('/filterByFullName', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
