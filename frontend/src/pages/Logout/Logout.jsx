import React from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../../../src/App.css';


function Logout() {
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await axios.get('http://localhost:5000/api/users/logout');
            navigate('/inloggen');
        } catch (error) {
            console.error(error);
        }
    };

    return (<div>
        <h1>Weet je zeker dat je wilt uitloggen?</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>);
}

export default Logout;
