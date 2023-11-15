import React, {useState, useEffect} from 'react';
import axios from 'axios';

function QuestionEditModal({surveyId, initialQuestions}) {

    const [error, setError] = useState(false);
    const [questions, setQuestions] = useState(initialQuestions);

    useEffect(() => {
        if (Array.isArray(initialQuestions)) {
            setQuestions(initialQuestions);
        }
    }, [initialQuestions]);

    const handleTypeChange = (e, index) => {
        const {value} = e.target;
        console.log(value)
        const updatedQuestions = [...questions];
        updatedQuestions[index].type = Number(value);
        setQuestions(updatedQuestions);
    };

    const handleQuestionChange = (e, questionIndex) => {
        const {value} = e.target;
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].text = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (e, questionIndex, optionIndex) => {
        const {value} = e.target;
        const updatedQuestions = [...questions];

        // Convert the options string to an array
        const optionsArray = updatedQuestions[questionIndex].options.split(",");
        // Update the value at the specified optionIndex
        optionsArray[optionIndex] = value;

        // Convert the options array back to a string
        updatedQuestions[questionIndex].options = optionsArray.join(",");

        setQuestions(updatedQuestions);
    };

    const handleSaveChanges = () => {
        // Check if any question is empty
        const isEmptyQuestion = questions.some(question => (question.question || question.text).trim() === '');
        if (isEmptyQuestion) {
            // Set the error state to true
            setError(true);
            return;
        }

        // Clear the error state if there are no empty questions
        setError(false);
        axios.post(`http://127.0.0.1:5000/api/questions/${surveyId}`, questions)
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
            });
    };


    return (
        <div className="modal fade" id="modalEditQuestion" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document" style={{maxWidth: '800px'}}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Vraag aanpassen</h5>
                        <button type="button" className="close bg-white border-0" data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            {questions.map((question, index) => (
                                <div key={index}>
                                    {/*<pre>{JSON.stringify(question, null, 2)}</pre>*/}
                                    <div className="form-group mt-3">
                                        <label htmlFor={`type_${index}`} className="mb-2">Type</label>
                                        <select
                                            className="form-control"
                                            id={`type_${index}`}
                                            name="type"
                                            value={question.type ? '1' : '0'}
                                            onChange={(e) => handleTypeChange(e, index)}
                                        >
                                            <option value="0">Open vraag</option>
                                            <option value="1">Meer keuze</option>
                                        </select>
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor={`question_${index}`} className="mb-2">Vraag</label>
                                        <input
                                            type="text"
                                            className={`form-control ${error && question.question.trim() === '' ? 'is-invalid' : ''}`}
                                            id={`question_${index}`}
                                            name="question"
                                            defaultValue={question.text}
                                            placeholder="Vraag"
                                            onChange={(e) => handleQuestionChange(e, index)}

                                        />
                                        {error && question.question.trim() === '' && (
                                            <div className="invalid-feedback">Vraag is verplicht</div>
                                        )}
                                    </div>
                                    {(question.type === true || question.type === 1) && (
                                        <div className="form-group mt-3">
                                            {question.options.split(',').map((option, optionIndex) => (
                                                <div key={optionIndex}>
                                                    <label
                                                        className="my-3">{`Optie ${String.fromCharCode(65 + optionIndex)}`}</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        defaultValue={option}
                                                        placeholder={`Optie ${String.fromCharCode(65 + optionIndex)}`}
                                                        onChange={(e) => handleOptionChange(e, index, optionIndex)}
                                                    />
                                                </div>
                                            ))}
                                            <span style={{fontSize: '12px'}}>Tip: Je hoeft ze niet allemaal in te vullen. 😉</span>
                                        </div>
                                    )}

                                </div>
                            ))}
                        </form>

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

export default QuestionEditModal;
