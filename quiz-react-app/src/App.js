import React from "react";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { nanoid } from "nanoid";

export default function App() {
  const [quizData, setQuizData] = React.useState("");

  console.log("quizData");
  function shuffle(array){
    let currentIndex = array.length
    while(currentIndex !== 0){
       let randomIndex = Math.floor(Math.random()*currentIndex)
       currentIndex--
       [array[currentIndex],array[randomIndex]]=[array[randomIndex],array[currentIndex]]
    }
    return array
}

  React.useEffect(() => {
    console.log("effect run");
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuizData(
          data.results.map((elem) => ({
            answers: shuffle([
              {
                answer: elem.correct_answer,
                isSelected: false,
                isCorrect: true,
                id:nanoid()
              },
              ...elem.incorrect_answers.map((answer) => ({
                answer: answer,
                isSelected: false,
                isCorrect: false,
                id: nanoid()
              })),
            ]),
            question: elem.question,
          }))
        );
      });

    console.log(quizData);
  }, []);

  // console.log(quizData[1].category)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index path="home" element={<Home />} />
          <Route path="quiz" element={<Quiz quizData={quizData} setQuizData={setQuizData} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
