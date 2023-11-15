import React, {useState, useEffect} from "react";
import axios from "axios";

function TeamEditModal({teamId, onClose}) {
    const [teamName, setTeamName] = useState("");
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/teams/${teamId}`)
            .then((response) => {
                const teamData = response.data.team;
                setTeamName(teamData.name);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [teamId]);

    const handleSaveChanges = () => {
        const data = {
            name: teamName
        };

        axios
            .post(`http://localhost:5000/api/teams/${teamId}`, data)
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDeleteTeam = () => {
        axios
            .delete(`http://localhost:5000/api/v1/teams/${teamId}`)
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
            id="TeamEditModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">
                            Team aanpassen / verwijderen
                        </h5>
                        <button
                            type="button"
                            className="close bg-white border-0"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={onClose}
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
                                    name={"name"}
                                    value={teamName}
                                    placeholder="Naam"
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
                            className="btn btn-danger"
                            onClick={handleDeleteTeam}
                        >
                            Verwijderen
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                            onClick={onClose}
                        >
                            Sluiten
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamEditModal;