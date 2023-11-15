import React, { useRef, useEffect, useState } from "react";
import Swiper, { Navigation } from "swiper";
import axios from "axios";

import "swiper/css";

function AnswerPage() {
  const swiperRef = useRef(null);
  const [questions, setQuestions] = useState([]);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track submission

  // Initialize Swiper after the component has mounted
  useEffect(() => {
    swiperRef.current = new Swiper(".swiper-container", {
      modules: [Navigation],
      allowTouchMove: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: {
        slideChange: () => {
          setIsLastSlide(swiperRef.current.isEnd);
        },
      },
    });
  }, []);

  useEffect(() => {
    const pathTokens = window.location.pathname.split("/");
    const token = pathTokens[pathTokens.length - 1];

    axios
      .get(`http://127.0.0.1:5000/api/answers/${token}`)
      .then((response) => {
        // Handle the response data
        const questions = response.data.questions;
        setQuestions(questions);
        // Initialize answers state with empty strings for each question
        setAnswers(Array(questions.length).fill(""));
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }, []);

  const handleAnswerChange = (question_id, index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = { question_id, value };
    setAnswers(updatedAnswers);
  };

  const handleFormSubmit = () => {
    // Make the Axios call to send answers to the backend API
    axios
      .post("http://127.0.0.1:5000/api/answers", {
        answers: answers,
      })
      .then((response) => {
        // Handle the response
        console.log(response);
        console.log("Answers saved successfully!");
        setIsSubmitted(true); // Set the submission state to true
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };

  return (
    <div id="AnswerPage" className="vh-100 bg-light">
      <div className="container pt-2">
        <div className="top d-flex justify-content-center py-5">
          <img src="/logo-dyflexis-2.svg" className="w-25" alt="Logo" />
        </div>
        <div className="row">
          <div className="col-12">
            {!isSubmitted ? ( // Render the form if not submitted
              <div className="swiper-container overflow-hidden">
                <div className="swiper-wrapper">
                  {questions.map((question, index) => (
                    <div className="swiper-slide" key={index}>
                      <div className="card" style={{ minHeight: "300px" }}>
                        <div className="card-body">
                          <h5 className="card-title">Vraag {index + 1}</h5>
                          <span className="card-count">
                            {index + 1}/{questions.length}
                          </span>
                          <p className="card-text">{question.text}</p>
                          {question.type ? (
                            <div>
                              {question.options.split(",").map((option, optionIndex) => (
                                <div key={optionIndex} className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name={`question-${question.id}`} // Unique name for each question
                                    value={option.trim()}
                                    onChange={(e) =>
                                      handleAnswerChange(question.id, index, e.target.value)
                                    }
                                  />
                                  <label className="form-check-label" htmlFor={`option-${optionIndex}`}>
                                    {option.trim()}
                                  </label>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="form">
                              <textarea
                                name="answer"
                                className={"form-control"}
                                id="answer"
                                cols="30"
                                rows="10"
                                value={answers[index]?.value || ""}
                                onChange={(e) => handleAnswerChange(question.id, index, e.target.value)}
                              ></textarea>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="buttons d-flex justify-content-between mt-3">
                  <>
                    <div className="swiper-button-prev btn btn-primary">Vorige</div>
                    <div className="swiper-button-next btn btn-primary">Volgende</div>
                  </>
                </div>
                {isLastSlide && (
                  <div className="buttons d-flex justify-content-end mt-3">
                    <button className="btn btn-success" onClick={handleFormSubmit}>
                      Versturen
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <h2>Bedankt voor het invullen van het formulier</h2>
                <p>Je antwoorden zijn verstuurd!.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnswerPage;
