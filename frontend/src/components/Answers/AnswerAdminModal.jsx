import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion'

function AnswerAdminModal({surveyId, initialQuestions, initialAnswers, initialMembers}) {

    const [error, setError] = useState(false);
    const [questions, setQuestions] = useState(initialQuestions || []);
    const [answers, setAnswers] = useState(initialAnswers);
    const [members, setMembers] = useState(initialMembers);

    useEffect(() => {
        if (Array.isArray(initialQuestions)) {
            setQuestions(initialQuestions);
        }

        if (Array.isArray(initialAnswers)) {
            setAnswers(initialAnswers);
        }

        if (Array.isArray(initialMembers)) {
            setMembers(initialMembers);
        }
    }, [initialQuestions, initialAnswers, initialMembers]);

    return (
    <div
      className="modal fade"
      id="modalShowSurvey"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '800px' }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Antwoorden bij deze vragenlijst
            </h5>
            <button type="button" className="close bg-white border-0" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {/* Check if there are questions */}
            {questions.length === 0 || questions === undefined ? (
                  <p style={{ color: 'red' }}>Er zijn geen vragen bij deze vragenlijst.</p>

            ) : (
              <>
                {/* Check if there are members */}
                {members.length === 0 ? (
              <p style={{ color: 'red' }}>Er zijn geen leden gevonden voor deze vragenlijst.</p>
                ) : (
                  <Accordion defaultActiveKey="0">
                    {questions.map((question, index) => (
                      <Accordion.Item eventKey={index} key={index}>
                        <Accordion.Header>{question.text}</Accordion.Header>
                        <Accordion.Body>
                          {answers.map((answer) => {
                            return members.map((member) => {
                              if (answer.question_id === question.id && answer.user_id === member.id) {
                                return (
                                  <p style={{ color: 'green' }} key={answer.id}>
                                    <b>{member.name}:</b> {answer.text}
                                  </p>
                                );
                              }
                              return null;
                            });
                          })}
                          {/* Check if any member has not filled in the question */}
                          {members.map((member) => {
                            const isAnswered = answers.some(
                              (answer) => answer.question_id === question.id && answer.user_id === member.id
                            );
                            if (!isAnswered) {
                              return (
                                <p key={member.id} style={{ color: 'red' }}>
                                  <b>{member.name}</b> heeft de vraag nog niet ingevuld.
                                </p>
                              );
                            }
                            return null;
                          })}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                )}
              </>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">
              Sluiten
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnswerAdminModal;
