import React, { useState } from 'react';
import axios from 'axios';

const PersonForm = (props) => {
    const { firstName, lastName, age, email, handleSubmitProp, setFirstName, setLastName, setAge, setEmail } = props;

    // const [firstName, setFirstName] = useState(initialFirstName);
    // const [lastName, setLastName] = useState(initialLastName);
    // const [age, setAge] = useState(initialAge);
    // const [email, setEmail] = useState(initialEmail);
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     handleSubmitProp({ firstName, lastName, age, email });
    // }

    return (
        <form className="d-flex flex-column align-items-center p-5" onSubmit={handleSubmitProp}>
            <div>
                <label className="form-group p-2">First Name: </label>
                <input
                    type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
                <label className="form-group p-2">Last Name: </label>
                <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
                <label className="form-group p-2">Age: </label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div>
                <label className="form-group p-2">Email: </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
        </form>
    )
}

export default PersonForm;