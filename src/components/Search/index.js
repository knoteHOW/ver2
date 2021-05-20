// services

const search = {};

search.All = require("./All");
search.CourseList = require("./CourseList");
search.Favorite = require("./Favorite");
search.NoteList = require("./NoteList");
search.ProblemList = require("./ProblemList");
search.QuestionList = require("./QuestionList");

module.exports = search;