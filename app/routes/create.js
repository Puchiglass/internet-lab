const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue')

// Маршруты для отображения формы создания новой ошибки
router.get('/', (req, res) => {
    res.render('createIssue.ejs');
});
router.get('/create', (req, res) => {
    res.render('createIssue.ejs');
});

// Маршрут для обработки отправки формы и добавления новой ошибки в базу данных
router.post('/create', async (req, res) => {
    try {
        const {firstname, lastname, surename, description} = req.body;

        console.log("==============================================");
        console.log("Полученные данные:", req.body);
        console.log("==============================================");

        // создает новую ошибку
        const newIssue = await Issue.create({
            firstname: firstname,
            lastname: lastname,
            surename: surename,
            description: description,
            resolved: false // по умолчанию ошибка не решена
        });

        console.log('Новая ошибка добавлена в БД: ', newIssue);

        res.redirect('/issue');
    } catch(err) {
        console.error('Ошибка при создание новой ошибки: ', err);
        res.status(500).send('Произошла ошибка при создании новой ошибки.');
    }
});

module.exports = router;
