import React from "react";
import MemberCreateModal from "../../components/Members/MemberCreateModal";
import MemberList from "../../components/Members/MemberList";

function MemberPage() {
    return (
        <>
            <MemberCreateModal/>
            <div id={"MemberPage"}>
                <div className="container mt-5">
                    <div className="top d-flex justify-content-between my-5">
                        <h1>Lijst van alle teamleden</h1>

                        <a href="#" className={"btn btn-primary d-flex align-items-center"} data-toggle="modal"
                           data-target="#MemberCreateModal">Teamlid aanmaken</a>
                    </div>
                    <MemberList/>
                </div>
            </div>
        </>
    )
}

export default MemberPage;
