import React, {useEffect, useState} from 'react';
import QuestionCreateModal from "../../components/Questions/QuestionCreateModal";
import QuestionEditModal from "../../components/Questions/QuestionEditModal";
import SurveyEditModal from "../../components/Surveys/SurveyEditModal";
import axios from "axios";

function SurveyList() {
    const [surveys, setSurveys] = useState([]);
    const [modalQuestions, setModalQuestions] = useState([]);
    const [modalSurveyId, setModalSurveyId] = useState(null);

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


    const getQuestions = (surveyId) => {
        axios.get(`http://127.0.0.1:5000/api/questions/${surveyId}`)
            .then((response) => {
                const questions = response.data.questions;
                setModalSurveyId(surveyId);
                setModalQuestions(questions); // Set the retrieved questions as the initialQuestions prop
            });
    };

    const handleOpenModal = (surveyId) => {
        setModalSurveyId(surveyId);
    };

    const handleDelete = (surveyId) => {
        axios.delete(`http://127.0.0.1:5000/api/surveys/${surveyId}`)
            .then((response) => {
                window.location.reload();
            });
    };

    const sendMail = (surveyId) => {
       axios.get(`http://127.0.0.1:5000/api/surveys/mail/${surveyId}`)
            .then((response) => {
                console.log(response)
            });
    };

    return (
        <>
            {modalSurveyId && (
                <QuestionCreateModal surveyId={modalSurveyId}/>
            )}

            {modalSurveyId && (
                <SurveyEditModal surveyId={modalSurveyId}/>
            )}

            {modalSurveyId && (
                <QuestionEditModal surveyId={modalSurveyId} initialQuestions={modalQuestions}/>
            )}

            <table className="table">
                <thead className="thead-light">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Naam</th>
                    <th scope="col">Team</th>
                    <th scope="col">..</th>
                    <th scope="col">..</th>
                    <th scope="col">..</th>
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
                            {survey.questions && survey.questions.length > 0 ? (
                                <>
                                    <a
                                        href="#"
                                        className="btn btn-primary"
                                        data-toggle="modal"
                                        data-target="#modalEditQuestion"
                                        onClick={() => getQuestions(survey.id)}
                                    >
                                        Vragenlijst aanpassen
                                    </a>
                                </>
                            ) : (
                                <a
                                    href="#"
                                    className="btn btn-success"
                                    data-toggle="modal"
                                    data-target="#modalCreateQuestion"
                                    onClick={() => handleOpenModal(survey.id)}
                                >
                                    Vragen toevoegen
                                </a>
                            )}
                        </td>
                        <td>
                            <a
                                href="#"
                                className="btn btn-primary"
                                data-toggle="modal"
                                data-target="#modalEditSurvey"
                                onClick={() => handleOpenModal(survey.id)}
                            >
                                Aanpassen
                            </a>
                        </td>
                        <td>
                            <a
                                className="btn btn-danger"
                                onClick={() => handleDelete(survey.id)}
                            >
                                Verwijderen
                            </a>
                        </td>
                        <td>
                            <a
                                href="#"
                                className="btn btn-success"
                                onClick={() => sendMail(survey.id)}
                            >
                                Mails versturen
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default SurveyList;
