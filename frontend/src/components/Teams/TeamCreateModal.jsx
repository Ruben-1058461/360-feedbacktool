import React, { useState } from "react";
import axios from "axios";

function TeamCreateModal() {
  const [teamName, setTeamName] = useState("");

const handleSaveChanges = () => {
  let data = JSON.stringify({
    name: teamName,
  });

  let config = {
    method: "post",
    url: "http://127.0.0.1:5000/api/teams",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};

  return (
    <div
      className="modal fade"
      id="TeamCreateModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Team toevoegen
            </h5>
            <button
              type="button"
              className="close bg-white border-0"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="name" className="mb-2">
                  Naam
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Vul een naam in"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveChanges}
            >
              Opslaan
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Sluiten
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamCreateModal;
