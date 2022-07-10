import React from "react";
import { Outlet, Link } from "react-router-dom"
import { nanoid } from 'nanoid'


export default function Quiz (props){
    console.log(props)
    //SHUFFLE FUNCTION
    function shuffle(array){
        let currentIndex = array.length
        while(currentIndex !== 0){
           let randomIndex = Math.floor(Math.random()*currentIndex)
           currentIndex--
           [array[currentIndex],array[randomIndex]]=[array[randomIndex],array[currentIndex]]
        }
        return array
    }
      

    const quizElement = props.quizData.map(elem => {
        // console.log(elem.question)
        function chooseAnswer(index,e){
            e.preventDefault()
            console.log(index)
            e.target.classList.add("choosenAnswer")
            for (let i = 0; i<answers.length;i++){
                if(index === answers.indexOf()){
                    
                }
            }
            
        }
        const answers = []
        answers.push(...elem.incorrect_answers)
        answers.push(elem.correct_answer)
        shuffle(answers)
        let answersElem = answers.map(answer=> {
            return (<span key={nanoid()}>
                <span onClick={(e)=>chooseAnswer(answers.indexOf(answer),e)} className="answer">{answer}</span>
            </span>
                    
                )
        })
        return <div key={nanoid()}>
            <h3>{elem.question}</h3>
            <div>
                {answersElem}
            </div>
        </div>
    })  
    return(
        <div>
            {quizElement}
            <Link to="/home">Home</Link>
        </div>
        

    )
}