
import React from "react";
import Home from "./pages/Home"
import Quiz from "./pages/Quiz"
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  const [quizData, setQuizData] = React.useState("") 
  console.log("test")

  React.useEffect(()=>{
    console.log("effect run")
    fetch("https://opentdb.com/api.php?amount=5")
    .then(res => res.json())
    .then(data=>(
        setQuizData(data.results)
            ))
      console.log(quizData)
  },[])
  

  // console.log(quizData[1].category)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
        <Route index path = "home" element={<Home />} />
          <Route path="quiz" element={<Quiz quizData = {quizData}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


