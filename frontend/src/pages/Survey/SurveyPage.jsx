import React from "react";
import SurveyCreateModal from "../../components/Surveys/SurveyCreateModal";
import SurveyList from "../../components/Surveys/SurveyList";

function SurveyPage() {
    return (
        <>
            <SurveyCreateModal/>
            <div id={"SurveyPage"}>
                <div className="container mt-5">
                    <div className="top d-flex justify-content-between my-5">
                        <h1>Vragenlijst</h1>

                        <a href="#" className={"btn btn-primary d-flex align-items-center"} data-toggle="modal"
                           data-target="#modalCreateSurvey">Vragenlijst aanmaken</a>
                    </div>
                    <SurveyList/>
                </div>
            </div>
        </>
    )
}

export default SurveyPage;