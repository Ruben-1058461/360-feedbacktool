import React from "react";
import AnswerAdminList from "../../components/Answers/AnswerAdminList";

function AnswerAdminPage() {
    return (
        <>
            <div id={"AnswerAdminPage"}>
                <div className="container mt-5">
                    <div className="top d-flex justify-content-between my-5">
                        <h1>Antwoorden</h1>
                    </div>
                    <AnswerAdminList />
                </div>
            </div>
        </>
    )
}

export default AnswerAdminPage;