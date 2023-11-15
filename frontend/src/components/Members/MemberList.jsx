import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MemberEditModal from "./MemberEditModal";
import TeamEditModal from "../Teams/TeamEditModal";

// Define state variable 'Members' and its setter function 'setMembers'
function MemberList() {
    const [members, setMembers] = useState([]);
    const [modalMemberId, setModalMemberId] = useState(null);
    const [modalTeamId, setModalTeamId] = useState(null);

    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetch('http://127.0.0.1:5000/api/members')
            .then(response => response.json()) // Convert response to JSON
            .then(data => {
                console.log(data);
                setMembers(data); // Update 'Members' state with fetched data

            })
            .catch(error => {
                console.error('Er is een probleem bij het ophalen van gegevens:', error); // Log error if fetching fails
            });
    }, []);

    // const handleOpenModal = (userId) => {
    //     console.log('ik kom hierlangs')
    //     setModalMemberId(userId);
    // };

        const handleOpenModal = (teamId) => {
        setModalTeamId(teamId);
    };


    console.log(modalTeamId)
    return (
        <>
            {modalTeamId && (

                <MemberEditModal teamId={modalTeamId} onClose={() => setModalTeamId(null)}/>
            )}
            <table className="table">
                <thead className="thead-light">
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Naam</th>
                    <th scope="col">Email</th>
                </tr>
                </thead>
                <tbody>
                {members.map(user => (
                    <tr key={user.id}>
                        <th scope="row">{user.id}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        {/*<td>*/}
                        {/*    <a href="#" className="btn btn-primary" data-toggle="modal"*/}
                        {/*       data-target="#MemberEditModal" onClick={() => handleOpenModal(user.id)}>Aanpassen</a>*/}
                        {/*</td>*/}
                    </tr>
                ))}
                </tbody>
            </table>

        </>
    );
}

export default MemberList;