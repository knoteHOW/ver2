import React, {useEffect, useState} from "react";
import NoteList from "./NoteList";
import ProblemList from "./ProblemList";
import QuestionList from "./QuestionList";
import CourseList from "./CourseList";
import BlankResult from "./BlankResult";

const All = ({searchResults, query}) => {

  const blankResult = (searchResults.courses.totalCount == 0) && (searchResults.notes.totalCount == 0)
      && (searchResults.problems.totalCount == 0) && (searchResults.questions.totalCount == 0);

  return (
      blankResult ?
          <BlankResult query={query} />
          :
          <>
            <CourseList courses={searchResults.courses.courses} isSummary={true} />
            <NoteList notes={searchResults.notes.notePages} isSummary={true} />
            <ProblemList problems={searchResults.problems.problems} isSummary={true} />
            <QuestionList questions={searchResults.questions.questions} isSummary={true} />
          </>
  )
};

export default All;
