import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PersonForm from '../components/PersonForm';

const Update = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [updatedFirstName, setUpdatedFirstName] = useState('');
    const [updatedLastName, setUpdatedLastName] = useState('');
    const [updatedAge, setUpdatedAge] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('')
    // const [buttonLabel, setButtonLabel] = ('Update');

    useEffect(() => {
        axios.get('http://localhost:8000/api/people/' + id) // making a request to our server to get the person with id equal to the one in the url
            .then(res => {
                console.log(props._id);
                console.log("res.data", res.data);
                console.log(id);
                setUpdatedFirstName(res.data.firstName);
                setUpdatedLastName(res.data.lastName);
                setUpdatedAge(res.data.age);
                setUpdatedEmail(res.data.email);
            })
            .catch(err => console.log("Error", err));
    }, []);

    const handleUpdatePerson = (e) => { // this will send a PUT request to update the instance in the database
        e.preventDefault();
        axios.put('http://localhost:8000/api/people/' + id, {
            firstName: updatedFirstName,
            lastName: updatedLastName,
            age: updatedAge,
            email: updatedEmail
        })
            .then(res => {
                console.log(res)
                navigate('/people/' + id)
            })
            .catch(err => console.log(err))
    }

    return (
        <PersonForm handleSubmitProp={handleUpdatePerson} setFirstName={setUpdatedFirstName} setLastName={setUpdatedLastName} setAge={setUpdatedAge} setEmail={setUpdatedEmail} firstName={updatedFirstName} lastName={updatedLastName} age={updatedAge} email={updatedEmail} />
    )
}

export default Update;