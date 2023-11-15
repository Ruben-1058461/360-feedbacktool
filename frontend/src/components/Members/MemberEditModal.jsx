import React, { useState } from "react";
import axios from "axios";

function MemberEditModal() {
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberTeam, setMemberTeam] = useState("");
  const [actionType, setActionType] = useState("change");

  // const handleSaveChanges = () => {
  //   if (actionType === "change") {
  //     let data = JSON.stringify({
  //       name: memberName,
  //       email: memberEmail,
  //       department: memberTeam
  //     });
  //
  //     let config = {
  //       method: "post",
  //       maxBodyLength: Infinity,
  //       url: "http://127.0.0.1:5000/api/members",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       data: data
  //     };
  //
  //     axios
  //       .request(config)
  //       .then((response) => {
  //         console.log(JSON.stringify(response.data));
  //         window.location.reload();
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }


return (
        <div
            className="modal fade"
            id="MemberEditModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">
                            Member aanpassen / verwijderen
                        </h5>
                        {/*<button*/}
                        {/*    type="button"*/}
                        {/*    className="close bg-white border-0"*/}
                        {/*    data-dismiss="modal"*/}
                        {/*    aria-label="Close"*/}
                        {/*    onClick={onClose}*/}
                        {/*>*/}
                        {/*    <span aria-hidden="true">&times;</span>*/}
                        {/*</button>*/}
                    </div>
                    {/*<div className="modal-body">*/}
                    {/*    <form>*/}
                    {/*        <div className="form-group">*/}
                    {/*            <label htmlFor="name" className="mb-2">*/}
                    {/*                Naam*/}
                    {/*            </label>*/}
                    {/*            <input*/}
                    {/*                type="text"*/}
                    {/*                className="form-control"*/}
                    {/*                id="name"*/}
                    {/*                name={"name"}*/}
                    {/*                value={teamName}*/}
                    {/*                placeholder="Naam"*/}
                    {/*                onChange={(e) => setTeamName(e.target.value)}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </form>*/}
                    {/*</div>*/}
                    <div className="modal-footer">
                        {/*<button*/}
                        {/*    type="button"*/}
                        {/*    className="btn btn-primary"*/}
                        {/*    onClick={handleSaveChanges}*/}
                        {/*>*/}
                        {/*    Opslaan*/}
                        {/*</button>*/}
                        {/*<button*/}
                        {/*    type="button"*/}
                        {/*    className="btn btn-danger"*/}
                        {/*    onClick={handleDeleteTeam}*/}
                        {/*>*/}
                        {/*    Verwijderen*/}
                        {/*</button>*/}
                        {/*<button*/}
                        {/*    type="button"*/}
                        {/*    className="btn btn-secondary"*/}
                        {/*    data-dismiss="modal"*/}
                        {/*    onClick={onClose}*/}
                        {/*>*/}
                        {/*    Sluiten*/}
                        {/*</button>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MemberEditModal;