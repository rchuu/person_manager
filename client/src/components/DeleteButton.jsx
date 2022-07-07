import React from 'react';
import axios from 'axios';

const DeleteButton = (props) => {
    const { id, people, setPeople } = props;
    const removeFromDom = personId => {
        setPeople(people.filter(person => person._id !== personId)); // making a call back, this will remove the person from the dom
    }

    const deletePerson = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/people/${id}`)
            .then(res => {
                removeFromDom(id);
                // history.push('/');
            }).catch(err => {
                console.log("Error: ", err);
            }
            );
    }
    return (
        <button onClick={deletePerson}>Delete</button>
    );
}

export default DeleteButton;