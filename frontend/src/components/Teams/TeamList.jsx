import React, {useEffect, useState} from 'react';
import axios from 'axios';
import TeamEditModal from "./TeamEditModal";

function TeamList() {
    const [teams, setTeams] = useState([]);
    const [modalTeamId, setModalTeamId] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/teams')
            .then(response => response.json())
            .then(data => {
                setTeams(data);
            })
            .catch(error => {
                console.error('Er is een probleem bij het ophalen van gegevens:', error);
            });
    }, []);

    const handleOpenModal = (teamId) => {
        setModalTeamId(teamId);
    };

    return (
        <>
            {modalTeamId && (
                <TeamEditModal teamId={modalTeamId} onClose={() => setModalTeamId(null)}/>
            )}

            <table className="table">
                <thead className="thead-light">
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Naam</th>
                    <th scope="col">Teamleden per team</th>
                    <th scope="col">...</th>
                </tr>
                </thead>
                <tbody>
                {teams.map(team => (
                    <tr key={team.id}>
                        <th scope="row">{team.id}</th>
                        <td>{team.name}</td>
                        <td>
                            <a href="#" className="btn btn-primary" data-toggle="modal">Teamleden</a>
                        </td>
                        <td>
                            <a href="#" className="btn btn-primary" data-toggle="modal"
                               data-target="#TeamEditModal" onClick={() => handleOpenModal(team.id)}>Aanpassen</a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default TeamList;
