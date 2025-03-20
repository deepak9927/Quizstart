const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Option text is required"]
  },
  isCorrect: {
    type: Boolean,
    default: false
  }
});

const quizQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Question is required"]
  },
  options: {
    type: [optionSchema],
    validate: {
      validator: function (options) {
        return options.length >= 2; // Ensure at least 2 options
      },
      message: "At least two options are required"
    }
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "medium"
  },
  category: {
    type: String,
    required: [true, "Category is required"]
  },
  explanation: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Update `updatedAt` before every save
quizQuestionSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// ✅ Update `updatedAt` when modifying existing documents
quizQuestionSchema.pre(["findOneAndUpdate", "updateOne"], function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model("QuizQuestion", quizQuestionSchema);
