import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PersonForm from '../components/PersonForm';
import { useNavigate } from 'react-router-dom';

const Create = (props) => {

    // const { id } = useParams();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');

    const createPerson = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/people', {
            firstName: firstName,
            lastName: lastName,
            age: age,
            email: email
        })
            .then(res => {
                setFirstName('');
                setLastName('');
                setAge('');
                setEmail('');
                navigate('/');
            })
            .catch(err => console.log("Error", err));
    }

    return (
        <div>
            <PersonForm handleSubmitProp={createPerson} setFirstName={setFirstName} setLastName={setLastName} setAge={setAge} setEmail={setEmail} />
        </div>
    )
}


export default Create;