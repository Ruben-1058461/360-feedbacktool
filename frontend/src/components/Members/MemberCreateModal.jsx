import React, { useState } from "react";
import axios from "axios";

// Define state variables 'memberName' and 'memberEmail' and their setter functions
function MemberCreateModal() {
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberTeam, setMemberTeam] = useState("");

  const handleSaveChanges = () => {

    let data = JSON.stringify({
      "name": memberName,
      "email": memberEmail,
    });
    
    let config = {
      method: 'post',
      url: 'http://127.0.0.1:5000/api/members',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      window.location.reload()
    })
    .catch((error) => {
      console.log(error);
    });
    
  };

  return (
    <div
      className="modal fade"
      id="MemberCreateModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Teamlid toevoegen
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
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="mb-2">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Vul een email in"
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="team" className="mb-2">
                  Team
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="team"
                  value={memberTeam}
                  onChange={(e) => setMemberTeam(e.target.value)}
                  placeholder="Vul een team in"
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

export default MemberCreateModal;
