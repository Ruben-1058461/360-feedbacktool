import React, {useEffect, useState} from 'react';
import AnswerAdminModal from "../../components/Answers/AnswerAdminModal"
import axios from "axios";

function AnswerAdminList() {
    const [surveys, setSurveys] = useState([]);
    const [modalQuestions, setModalQuestions] = useState([]);
    const [modalSurveyId, setModalSurveyId] = useState(null);
    const [modalAnswers, setModalAnswers] = useState([]);
    const [modalMembers, setModalMembers] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/surveys')
            .then(response => response.json())
            .then(data => {
                setSurveys(data);
            })
            .catch(error => {
                console.error('There was a problem fetching data:', error);
            });
    }, []);

    const getQuestionsAnswers = (surveyId) => {
        axios.get(`http://127.0.0.1:5000/api/questions/${surveyId}`)
        .then((response) => {
            const questions = response.data.questions;
            setModalSurveyId(surveyId);
            setModalQuestions(questions); // Set the retrieved questions as the initialQuestions prop
        });

        axios.get(`http://127.0.0.1:5000/api/answers`)
        .then((response) => {
            const answers = response.data;
            setModalAnswers(answers);
        });

        axios.get(`http://127.0.0.1:5000/api/members/survey/${surveyId}`)
        .then((response) => {
            const members = response.data;
            setModalMembers(members);
        });
    };

    const handleOpenModal = (surveyId) => {
        setModalSurveyId(surveyId);
    };

    return (
        <>
            {modalSurveyId && (
                <AnswerAdminModal surveyId={modalSurveyId} initialQuestions={modalQuestions} initialAnswers={modalAnswers} initialMembers={modalMembers} />
            )}

            <table className="table">
                <thead className="thead-light">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Naam</th>
                    <th scope="col">Team</th>
                    <th scope="col">..</th>
                </tr>
                </thead>
                <tbody>
                {surveys.map((survey) => (
                    <tr key={survey.id}>
                        <th scope="row">{survey.id}</th>
                        <td>{survey.name}</td>
                        <td>
                            {survey.teams.map((team) => (
                                <span key={team.id}>{team.name}<br/></span>
                            ))}
                        </td>
                        <td>
                            <a
                                href="#"
                                className="btn btn-primary"
                                data-toggle="modal"
                                data-target="#modalShowSurvey"
                                onClick={() => getQuestionsAnswers(survey.id)}
                            >
                                Antwoorden bekijken
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default AnswerAdminList;
