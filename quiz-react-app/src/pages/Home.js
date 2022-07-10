import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="intro">
      <div className="intro-container">
        <h1 className="intro-title">Quizzical</h1>
        <p className="intro-description">Test Your Knowledge!</p>
        <Link to="/quiz" className="intro-btn">
          Start Quiz
        </Link>
      </div>
    </div>
  );
}
