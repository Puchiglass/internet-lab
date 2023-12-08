const mysql = require('mysql2');

// Создаем подключение к базе данных
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Coizhiv123!',
    database: 'support_app'
});

// Подключаемся к базе данных
db.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err);
        return;
    }
    console.log('Подключено к базе данных');
});

// SQL-запрос для создания таблицы
const createTableQuery = `
  CREATE TABLE Issues (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    surename VARCHAR(255) NOT NULL,
    description VARCHAR(500) NOT NULL,
    assignedTo VARCHAR(500) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    comment VARCHAR(500)
  );
`;

// Выполняем SQL-запрос
db.query(createTableQuery, (error, results, fields) => {
    if (error) {
        console.error('Ошибка выполнения запроса:', error);
    } else {
        console.log('Таблица успешно создана');
    }

    // Закрываем подключение после выполнения запроса
    db.end();
});
