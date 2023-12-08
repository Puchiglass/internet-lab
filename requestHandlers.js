const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('labadb.db');

app.use(bodyParser.urlencoded({ extended: true }));

// Отправка заявки
router.get('/', (req, res) => {
    res.render('submit.ejs');
});
router.get('/submit', (req, res) => {
    res.render('submit');
});
// Запрос на добавление проблемы
router.post('/submit', (req, res) => {
    const { fullName, phoneNumber, description } = req.body;
    const status = 'отправлена';

    db.run(
        'INSERT INTO issues (fullName, phoneNumber, description, status) VALUES (?, ?, ?, ?)',
        [fullName, phoneNumber, description, status],
        (err) => {
            if (err) {
                console.error(err.message);
                res.sendStatus(500);
            } else {
                console.log('Добавлена запись в issues')
                res.redirect('/allIssues');
            }
        }
    );
});


// Отображение списка ошибок для Админа
router.get('/issues', (req, res) => {
    // Запрос на получение всех проблем со статусом "отправлена"
    db.all('SELECT * FROM issues WHERE status = "отправлена" AND (assignedTo IS NULL OR assignedTo = "")', (err, issues) => {
        if (err) {
            console.error(err.message);
            res.sendStatus(500);
        } else {
            res.render('issues', { issues });
        }
    });
});
// Запрос на отправку ошибки сотруднику
router.post('/updateAssignedTo', (req, res) => {
    const { issueId, assignedTo } = req.body;

    // Обновление поля assignedTo в базе данных
    db.run('UPDATE issues SET assignedTo = ?, status = "в работе" WHERE id = ?', [assignedTo, issueId], (err) => {
        if (err) {
            console.error(err.message);
            res.sendStatus(500);
        } else {
            console.log('Заявка отправлена сотруднику')
            res.redirect('/issues');
        }
    });
});


// Выбор сотрудника
router.get('/assignedTo', (req, res) => {
    // Получите уникальных сотрудников из базы данных
    db.all('SELECT DISTINCT assignedTo FROM issues', (err, employees) => {
        if (err) {
            console.error(err.message);
            res.sendStatus(500);
        } else {
            // console.log(employees)
            res.render('assignedTo', { employees });
        }
    });
});
// Запрос выбора сотрудника
router.post('/assignedTo', (req, res) => {
    const selectedEmployee = req.body.employee;
    res.redirect(`/assignedTo/${selectedEmployee}`);
});


// Список ошибок для сотрудника тех поддержки
router.get('/assignedTo/:assignedTo', (req, res) => {
    const assignedTo = req.params.assignedTo;

    // Запрос на получение всех заявок для указанного сотрудника
    db.all('SELECT * FROM issues WHERE assignedTo = ? AND status = "в работе"', [assignedTo], (err, issues) => {
        if (err) {
            console.error(err.message);
            res.sendStatus(500);
        } else {
            res.render('assignedToName', { assignedTo, issues });
        }
    });
});
// Запрос изменения статуса заявления
router.post('/updateStatusAndComment', (req, res) => {
    const { issueId, status, comment } = req.body;

    // Обновление поля status и comment в базе данных
    db.run('UPDATE issues SET status = ?, comment = ? WHERE id = ?', [status, comment, issueId], (err) => {
        if (err) {
            console.error(err.message);
            res.sendStatus(500);
        } else {
            console.log("Заявка выполнена")
            res.redirect(`/assignedTo/${req.body.assignedTo}`);
        }
    });
});


// Список всех заявок
router.get('/allIssues', (req, res) => {
    // Запрос на получение всех заявок с выбранными полями
    db.all('SELECT fullName, description, status, assignedTo, comment FROM issues', (err, issues) => {
        if (err) {
            console.error(err.message);
            res.sendStatus(500);
        } else {
            res.render('allIssues', { issues });
        }
    });
});
// Список заявок от одного пользователя
router.post('/filterByFullName', (req, res) => {
    const fullName = req.body.fullName;

    // Query to get issues filtered by fullName
    db.all('SELECT * FROM issues WHERE fullName = ?', [fullName], (err, issues) => {
        if (err) {
            console.error(err.message);
            res.sendStatus(500);
        } else {
            res.render('allIssues', { issues });
        }
    });
});


module.exports = router;