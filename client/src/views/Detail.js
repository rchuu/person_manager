import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Detail = (props) => {
    const [person, setPerson] = useState({}); // person is an object
    const { id } = useParams(); // id is the id of the person

    useEffect(() => {
        axios.get('http://localhost:8000/api/people/' + id)
            .then(res => {
                setPerson(res.data)
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="p-5 m-5">
            <h1>Details</h1>
            <p>First Name : {person.firstName} </p>
            <p>Last Name : {person.lastName} </p>
            <p>Age : {person.age} </p>
            <p>Email : {person.email} </p>
            <Link to={'/people/' + person._id + '/edit'}>Edit</Link>
            <br></br>
            <Link to={'/'}>Back</Link>
        </div>
    )
}

export default Detail;
