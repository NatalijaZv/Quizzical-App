import React from "react";
import { Outlet, Link } from "react-router-dom";
import { nanoid } from "nanoid";

export default function Quiz(props) {
  console.log(props.quizData, "PROPS");

  //CHOOSE ANSWER
  function chooseAnswer(id, elem) {
    props.setQuizData((prev) => {
      const newArr = prev.map((data) => {
        const question = data.question;
        const currentIdx = prev.indexOf(elem);
        if (currentIdx === prev.indexOf(data)) {
          let answers = data.answers.map((answer) => {
            if (answer.id === id) {
              return { ...answer, isSelected: !answer.isSelected };
            } else {
              return { ...answer, isSelected: false };
            }
          });
          return { answers, question };
        }
        return data;
      });
      return newArr;
    });
  }
  
  function checkAnswers() {
    props.setIsAnswerChecked(true);
  }

  function playAgain() {
    props.setPlayAgain((prev) => !prev);
    props.setIsAnswerChecked(false);
  }
  let numAnswer = 0;
  if(props.isAnswerChecked){
    for (let i = 0; i < props.quizData.length; i++) {
      let answers = props.quizData[i].answers;
      for (let i = 0; i < answers.length; i++) {
        const isCorrect = answers[i].isCorrect;
        const isSelected = answers[i].isSelected;
        if (isCorrect && isSelected) {
          numAnswer++;
        }
      }
    }
  }
  const quizElement = props.quizData.map((elem) => {
    let answersElem = elem.answers.map((ans) => {
      if (props.isAnswerChecked) {
        return (
          <span
            key={ans.id}
            className={`answer 
          ${ans.isCorrect ? "is-correct" : "not-selected"} 
          ${ans.isSelected && ans.isCorrect === false ? "not-correct" : ""}
          `}
          >
            {ans.answer}
          </span>
        );
      } else {
        return (
          <span
            key={ans.id}
            onClick={() => chooseAnswer(ans.id, elem)}
            className={`answer ${ans.isSelected ? "isSelected" : ""}`}
          >
            {ans.answer}
          </span>
        );
      }
    });
    return (
      <div key={nanoid()}>
        <h3 className="quiz-question">{elem.question}</h3>
        <div className="all-answers">{answersElem}</div>
        <hr />
      </div>
    );
  });
  const quizBtn = props.isAnswerChecked ? (
    <div className="score-info">
      <span className="score-display">You scored {numAnswer}/5 correct answers!</span>
      <Link to="/home" onClick={playAgain} className="btn">
      Play again
    </Link>
    </div>
    
  ) : (
    <button onClick={() => checkAnswers()} className="btn">Check answers</button>
  );

  return (
    <div className="container">
      {quizElement}
      <div className="answer-btn">{quizBtn}</div>
    </div>
  );
}
