import React from "react";
import QuestionCreateModal from "../../components/Questions/QuestionCreateModal"
import QuestionList from "../../components/Questions/QuestionList";

function QuestionPage() {
    return (
        <>
            <QuestionCreateModal/>
            <div id={"QuestionPage"}>
                <div className="container mt-5">
                    <div className="top d-flex justify-content-between my-5">
                        <h1>Lijst van alle vragen</h1>

                        <a href="#" className={"btn btn-primary d-flex align-items-center"} data-toggle="modal"
                           data-target="#modalQuestionCreateModal">Vraag aanmaken</a>
                    </div>
                    <QuestionList/>
                </div>
            </div>
        </>
    )
}

export default QuestionPage;
