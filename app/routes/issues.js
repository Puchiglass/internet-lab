const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');
const User = require('../models/User');

// Создание заявки
router.post('/create', async (req, res) => {
    try {
        const { description } = req.body;
        const userId = req.session.userId; // Получаем ID пользователя из сессии
        const issue = await Issue.create({ description, userId });
        res.redirect('/issues/list');
    } catch (error) {
        console.error(error);
        res.redirect('/user/dashboard');
    }
});

// Просмотр списка заявок
router.get('/list', async (req, res) => {
    try {
        const issues = await Issue.findAll();
        res.render('issues-list.ejs', { issues });
    } catch (error) {
        console.error(error);
        res.redirect('/user/dashboard');
    }
});

// Назначение заявки сотруднику
router.post('/assign/:issueId', async (req, res) => {
    try {
        const { assignedTo } = req.body;
        const issueId = req.params.issueId;
        await Issue.update({ assignedTo }, { where: { id: issueId } });
        res.redirect('/issues/list');
    } catch (error) {
        console.error(error);
        res.redirect('/user/dashboard');
    }
});

// Решение заявки
router.post('/resolve/:issueId', async (req, res) => {
    try {
        const { comment } = req.body;
        const issueId = req.params.issueId;
        await Issue.update({ status: 'resolved' }, { where: { id: issueId } });
        // Добавьте код для сохранения комментария, если необходимо
        res.redirect('/issues/list');
    } catch (error) {
        console.error(error);
        res.redirect('/user/dashboard');
    }
});

module.exports = router;
