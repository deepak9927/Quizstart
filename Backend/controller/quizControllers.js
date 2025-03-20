// controllers/quizController.js
const QuizQuestion = require('../models/QuizQuestions');
const emailService = require('../service/emailService');

// Get all quiz questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await QuizQuestion.find();
    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};

// Get quiz question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const question = await QuizQuestion.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: question
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};

// Create new quiz question
exports.createQuestion = async (req, res) => {
  try {
    const question = await QuizQuestion.create(req.body);
    
    // Notify admin about new question
    if (process.env.ADMIN_EMAIL && process.env.EMAIL_USER) {
      try {
        await emailService.sendNotification(
          process.env.ADMIN_EMAIL,
          'New Quiz Question Created',
          `A new quiz question has been created: "${question.question}"`
        );
      } catch (emailErr) {
        console.error('Failed to send email notification:', emailErr);
        // Continue with the response even if email fails
      }
    }
    
    res.status(201).json({
      success: true,
      data: question
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Invalid data',
      error: err.message
    });
  }
};

// Update quiz question
exports.updateQuestion = async (req, res) => {
  try {
    const question = await QuizQuestion.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: question
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Invalid data',
      error: err.message
    });
  }
};

// Delete quiz question
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await QuizQuestion.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    await question.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};

// Get questions by category
exports.getQuestionsByCategory = async (req, res) => {
  try {
    const questions = await QuizQuestion.find({
      category: req.params.category
    });
    
    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};

// Get random quiz questions
exports.getRandomQuestions = async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 10;
    const difficulty = req.query.difficulty;
    const category = req.query.category;
    
    // Build query
    const query = {};
    if (difficulty) query.difficulty = difficulty;
    if (category) query.category = category;
    
    const questions = await QuizQuestion.aggregate([
      { $match: query },
      { $sample: { size: count } }
    ]);
    
    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};