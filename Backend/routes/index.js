// routes/index.js
const express = require('express');
const router = express.Router();
const quizController = require('../controller/quizControllers');
const contactController = require('../controller/contactController');

const { getCategories } = require("../controller/categoryController");

router.get("/categories", getCategories);

// Quiz question routes
router.get('/quiz-questions', quizController.getAllQuestions);
router.get('/quiz-questions/:id', quizController.getQuestionById);
router.post('/quiz-questions', quizController.createQuestion);
router.put('/quiz-questions/:id', quizController.updateQuestion);
router.delete('/quiz-questions/:id', quizController.deleteQuestion);

// Get questions by category
router.get('/quiz-questions/category/:category', quizController.getQuestionsByCategory);

// Get random quiz questions
router.get('/random-quiz', quizController.getRandomQuestions);

// Contact form routes
router.post('/contact', contactController.createContact);
router.get('/contact', contactController.getAllContacts);
router.get('/contact/:id', contactController.getContactById);
router.put('/contact/:id', contactController.updateContactStatus);
router.delete('/contact/:id', contactController.deleteContact);

module.exports = router;