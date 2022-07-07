import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';

// we are senging a request to our api to actualy delete our person.
const PersonList = (props) => {
    const { removeFromDom, people, setPeople } = props;

    // const deletePerson = (personId) => {
    //     axios.delete('http://localhost:8000/api/people/' + personId)
    //         .then(res => {
    //             removeFromDom(personId);
    //         })
    //         .catch(err => console.log(err));
    // }

    return (
        <div>
            {people.map((person, index) => {
                return <p key={index}>
                    <Link to={'/people/' + person._id}>
                        {person.firstName} {person.lastName}
                    </Link>
                    {' | '}
                    <DeleteButton people={people} id={person._id} setPeople={setPeople} />
                    {/* <button onClick={(e) => { deletePerson(person._id) }}>Delete</button> */}
                </p >
            })}
        </div >
    )
}

export default PersonList;