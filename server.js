const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

// Подключение к базе данных MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Coizhiv123!',
    database: 'support_app',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err.message);
    } else {
        console.log('Подключение к базе данных успешно');
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'my-key', resave: true, saveUninitialized: true }));

app.use(express.static(__dirname + 'app'));

// Подключение маршрутов
const indexRoutes = require('./app/routes/index');
const userRoutes = require('./app/routes/user');
const issuesRoutes = require('./app/routes/issues');

app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/issues', issuesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(__dirname)
});
