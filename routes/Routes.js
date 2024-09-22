const { getAllTodos, getTodo } = require('../controllers/Controller');

const router= require('express').Router();

router.get('/all',getAllTodos)
router.get('/:todoId',getTodo)
module.exports =router;