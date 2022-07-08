import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PersonForm from '../components/PersonForm';
import { useNavigate, Link } from 'react-router-dom';

const Create = (props) => {

    // const { id } = useParams();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

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
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) { // loop through the keys of the errorResponse object
                    errorArr.push(errorResponse[key].message) // errorResponse[key].message is the error message
                }
                // ("Error", err);
                setErrors(errorArr);
            });
    }

    return (
        <div className="m-5 p-5">
            <h1>Create a Person</h1>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <PersonForm handleSubmitProp={createPerson} setFirstName={setFirstName} setLastName={setLastName} setAge={setAge} setEmail={setEmail} />
            <Link to={'/'} className="btn btn-primary">Back</Link>
        </div>
    )
}


export default Create;