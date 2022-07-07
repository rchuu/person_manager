import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PersonForm from '../components/PersonForm';
import PersonList from '../components/PersonList';
import { Link } from 'react-router-dom';

const Dashboard = (props) => {

    // const { id } = useParams();
    // const navigate = useNavigate();
    const [people, setPeople] = useState([]); // people is an array of objects
    const [loaded, setLoaded] = useState(false); // this is to make sure that the data is loaded before the page is rendered

    useEffect(() => {
        axios.get('http://localhost:8000/api/people')
            .then(res => {
                setPeople(res.data);
                setLoaded(true);
            })
            .catch(err => console.log("Error", err));
    }, [])

    return (
        <div className="m-5 p-5">
            {
                loaded ?
                    <PersonList people={people} setPeople={setPeople} />
                    : <div>loading</div>
            }
            <Link to={'/people/create'} className="btn btn-primary">Add</Link>
        </div>
        //if loaded is true, render PersonList
    )
}


export default Dashboard;