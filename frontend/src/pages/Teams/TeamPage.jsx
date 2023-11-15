import React from "react";
import TeamCreateModal from "../../components/Teams/TeamCreateModal"
import TeamList from "../../components/Teams/TeamList";

function TeamPage() {
    return (
        <>
            <TeamCreateModal/>
            <div id={"TeamPage"}>
                <div className="container mt-5">
                    <div className="top d-flex justify-content-between my-5">
                        <h1>Lijst van alle teams</h1>

                        <a href="#" className={"btn btn-primary d-flex align-items-center"} data-toggle="modal"
                           data-target="#TeamCreateModal">Team aanmaken</a>
                    </div>
                    <TeamList/>
                </div>
            </div>
        </>
    )
}

export default TeamPage;
