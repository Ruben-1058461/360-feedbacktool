import React, {useState} from 'react';
import axios from "axios";

function QuestionCreateModal(surveyId) {
    const [error, setError] = useState(false);
    const [type, setType] = useState('open');
    const [questions, setQuestions] = useState([
        {
            type: 'open',
            question: '',
            options: ['', '', '', ''],
        },
    ]);

    const handleTypeChange = (e, index) => {
        const {value} = e.target;
        const updatedQuestions = [...questions];
        updatedQuestions[index].type = value;
        setQuestions(updatedQuestions);
    };

    const handleQuestionChange = (e, index) => {
        const {name, value} = e.target;
        const updatedQuestions = [...questions];
        updatedQuestions[index][name] = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (e, questionIndex, optionIndex) => {
        const {value} = e.target;
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(updatedQuestions);
    };

    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                type: 'open',
                question: '',
                options: ['', '', '', ''],
            },
        ]);
    };


    const handleSaveChanges = () => {
        // Check if any question is empty
        const isEmptyQuestion = questions.some(question => question.question.trim() === '');
        if (isEmptyQuestion) {
            // Set the error state to true
            setError(true);
            return;
        }

        // Clear the error state if there are no empty questions
        setError(false);
        axios.post('http://127.0.0.1:5000/api/questions', questions, { params: { surveyId } })
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
            });
    };
    return (
        <div className="modal fade" id="modalCreateQuestion" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document" style={{maxWidth: '800px'}}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Vraag toevoegen</h5>
                        <button type="button" className="close bg-white border-0" data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {questions.map((question, index) => (
                            <div key={index}>
                                <form>
                                    <div className="form-group mt-3">
                                        <label htmlFor={`type_${index}`} className="mb-2">Type</label>
                                        <select className="form-control" id={`type_${index}`} name="type"
                                                value={question.type} onChange={(e) => handleTypeChange(e, index)}>
                                            <option value="open">Open vraag</option>
                                            <option value="moreOptions">Meer keuze</option>
                                        </select>
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor={`question_${index}`} className="mb-2">Vraag</label>
                                        <input
                                            type="text"
                                            className={`form-control ${error && question.question.trim() === '' ? 'is-invalid' : ''}`}
                                            id={`question_${index}`}
                                            name="question"
                                            value={question.question}
                                            placeholder="Vraag"
                                            onChange={e => handleQuestionChange(e, index)}
                                        />
                                        {error && question.question.trim() === '' && (
                                            <div className="invalid-feedback">Vraag is verplicht</div>
                                        )}
                                    </div>
                                    {question.type === 'moreOptions' && (
                                        <div className="form-group mt-3">
                                            <label className="my-3">Optie A</label>
                                            <input type="text" className="form-control" value={question.options[0]}
                                                   placeholder="Optie A"
                                                   onChange={(e) => handleOptionChange(e, index, 0)}></input>
                                            <label className="my-3">Optie B</label>
                                            <input type="text" className="form-control" value={question.options[1]}
                                                   placeholder="Optie B"
                                                   onChange={(e) => handleOptionChange(e, index, 1)}></input>
                                            <label className="my-3">Optie C</label>
                                            <input type="text" className="form-control" value={question.options[2]}
                                                   placeholder="Optie C"
                                                   onChange={(e) => handleOptionChange(e, index, 2)}></input>
                                            <label className="my-3">Optie D</label>
                                            <input type="text" className="form-control" value={question.options[3]}
                                                   placeholder="Optie D"
                                                   onChange={(e) => handleOptionChange(e, index, 3)}></input>
                                            <span style={{fontSize: '12px'}}>Tip: Je hoeft ze niet allemaal in te vullen. 😉</span>
                                        </div>
                                    )}
                                </form>
                            </div>
                        ))}
                        <button type="button" className="btn btn-primary mt-3" onClick={addQuestion}>Vraag toevoegen
                        </button>
                        <ul></ul>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuestionCreateModal;
