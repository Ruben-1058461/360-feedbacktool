import React, {useEffect, useState} from 'react';
import axios from "axios";

function SurveyEditModal(props) {
    const [teams, setTeams] = useState([]);
    const [surveyName, setSurveyName] = useState("");
    const [survey, setSurvey] = useState("");
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [anonymous, setAnonymous] = useState(false);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/api/surveys/${props.surveyId}`)
            .then((response) => {
                const survey = response.data;
                setSurvey(survey);
                setSelectedTeams(survey.teams);
                setSurveyName(survey.name);
            })
            .catch((error) => {
                console.error(error);
            });

        axios.get("http://127.0.0.1:5000/api/teams")
            .then((response) => {
                const allTeams = response.data;
                setTeams(allTeams);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [props.surveyId]);

    const handleSaveChanges = () => {
        const surveyData = {
            name: surveyName,
            teams: selectedTeams,
            anonymous: anonymous
        };

        axios.post(`http://127.0.0.1:5000/api/surveys/${props.surveyId}`, surveyData)
            .then(data => {
                console.log("Surveys created successfully:", data);
                window.location.reload();
            })
            .catch(error => {
                console.error('There was a problem creating the survey:', error);
            });
    };

    return (
        <div className="modal fade" id="modalEditSurvey" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Vragenlijst aanpassen</h5>
                        <button type="button" className="close bg-white border-0" data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            {/*<pre>{JSON.stringify(survey, null, 2)}</pre>*/}

                            <div className="form-group">
                                <label htmlFor="name" className="mb-2">Naam</label>
                                <input type="text" className="form-control" id="name" placeholder="Naam"
                                       value={surveyName} onChange={(e) => setSurveyName(e.target.value)}/>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="team" className="mb-2">Team</label>
                                <select
                                    id="team"
                                    className="form-control"
                                    name="team"
                                    value={selectedTeams.map(team => team.id)}
                                    multiple={true}
                                    onChange={(e) =>
                                        setSelectedTeams(
                                            Array.from(e.target.selectedOptions, option => ({
                                                id: option.value,
                                                name: option.label
                                            }))
                                        )
                                    }
                                >
                                    {teams.map(team => (
                                        <option
                                            key={team.id}
                                            value={team.id}
                                            selected={selectedTeams.some(selectedTeam => selectedTeam.id === team.id)}
                                        >
                                            {team.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="anonymous" className="mb-2">Anoniem</label>

                                <select
                                    id="anonymous"
                                    className="form-control"
                                    name="anonymous"
                                    value={survey.anonymous ? "true" : "false"}
                                    onChange={(e) => setAnonymous(e.target.value === "true")}
                                >
                                    <option value="true">Ja</option>
                                    <option value="false">Nee</option>
                                </select>
                            </div>
                        </form>
                        <ul></ul>
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

export default SurveyEditModal;
