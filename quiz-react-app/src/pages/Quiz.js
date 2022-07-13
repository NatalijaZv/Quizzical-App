import React from "react";
import { Outlet, Link } from "react-router-dom";
import { nanoid } from "nanoid";

export default function Quiz(props) {

  function chooseAnswer(id, elem) {
    //SET NEW QUIZDATA
    props.setQuizData((prev) => {
      
      const prevArr = prev.map((data) => {
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
      return prevArr;
    });
  }
  const quizElement = props.quizData.map((elem) => {
    
    let answersElem = elem.answers.map((ans) => {
      return (
        <span key={ans.id}>
          <span
            onClick={() => chooseAnswer(ans.id, elem)}
            className={`answer ${ans.isSelected ? "isSelected" : ""}`}
          >
            {ans.answer}
          </span>
        </span>
      );
    });
    return (
      <div key={nanoid()}>
        <h3>{elem.question}</h3>
        <div>{answersElem}</div>
      </div>
    );
  });

  return (
    <div>
      {quizElement}
      <Link to="/home">Home</Link>
    </div>
  );
}
