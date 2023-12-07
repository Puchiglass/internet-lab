const express = require('express');
const router = express.Router();
const User = require('../models/User');


// Страница регистрации
router.get('/register', (req, res) => {
    res.render('register.ejs');
});

// Регистрация пользователя
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.create({ username, password });
        req.session.userId = user.id; // Сохраняем ID пользователя в сессии
        res.redirect('/user/dashboard');
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

// Аутентификация пользователя
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username, password } });

        if (user) {
            req.session.userId = user.id; // Сохраняем ID пользователя в сессии
            res.redirect('/user/dashboard');
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

// Пользовательский дашборд
router.get('/dashboard', async (req, res) => {
    try {
        // Ваш код для отображения данных на дашборде пользователя
        res.render('user-dashboard.ejs');
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

// Выход из системы
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
