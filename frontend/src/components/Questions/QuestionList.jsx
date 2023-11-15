import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionModal from './QuestionCreateModal';

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/teams/');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col"></th>
            <th scope="col">Tekst</th>
            <th scope="col">Open vraag / MC-vraag</th>
            <th scope="col">...</th>
          </tr>
        </thead>
        <tbody>
          {questions.map(question => (
            <tr key={question.id}>
              <td>{question.id}</td>
              <td>{question.text}</td>
              <td>{question.type ? 'Multiple Choice' : 'Open'}</td>
              <td>
                <button className="btn btn-primary" onClick={handleOpenModal}>
                  Aanpassen
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && <QuestionModal closeModal={handleCloseModal} />}
    </div>
  );
}

export default QuestionList;
