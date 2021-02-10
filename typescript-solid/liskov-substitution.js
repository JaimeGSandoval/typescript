"use strict";
// A subclass should be used wherever its base class can be used. The program shouldn't have any type of undefined behavior just because the sub class defines a method or property in a different way than its bae/parent class
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizQuestion = void 0;
var QuizQuestion = /** @class */ (function () {
    function QuizQuestion(question, ans1, ans2, ans3, ans4, correctAns) {
        this._question = question;
        this._answer1 = ans1;
        this._answer2 = ans2;
        this._answer3 = ans3;
        this._answer4 = ans4;
        this._correctAnswer = correctAns;
    }
    Object.defineProperty(QuizQuestion.prototype, "question", {
        get: function () {
            return this._question;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuizQuestion.prototype, "answer1", {
        get: function () {
            return this._answer1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuizQuestion.prototype, "answer2", {
        get: function () {
            return this._answer2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuizQuestion.prototype, "answer3", {
        get: function () {
            return this._answer3;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuizQuestion.prototype, "answer4", {
        get: function () {
            return this._answer4;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuizQuestion.prototype, "correctAnswer", {
        get: function () {
            return this._correctAnswer;
        },
        enumerable: false,
        configurable: true
    });
    return QuizQuestion;
}());
exports.QuizQuestion = QuizQuestion;
function formatQuestion(quizQuestion) {
    console.log(quizQuestion.question);
    console.log("1. " + quizQuestion.answer1);
    console.log("2. " + quizQuestion.answer2);
    console.log("3. " + quizQuestion.answer3);
    console.log("4. " + quizQuestion.answer4);
}
var quizQuestion = new QuizQuestion("Which framework is using TypeScript?", "React", "Vue", "Angular", "Cycle", 3);
formatQuestion(quizQuestion);
