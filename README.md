Let's jump right into creating our full stack MERN project. First, create a new folder called "myNewProject" and cd into it.

mkdir myNewProject
cd myNewProject
copy
Next, create a new project via:

npm init -y
copy
This will create the package.json for our server. We will then need to install our dependencies:

npm install express
npm install mongoose
copy
Next, via the terminal or the UI, create a new file called server.js.

Mac: touch server.js
Windows: copy nul server.js
copy
Then, within the server.js add the following code:

const express = require('express');
const app = express();
const port = 8000;
    
app.listen(port, () => console.log(`Listening on port: ${port}`) );copy
Let's create our modularized project structure by making a folder called "server" and then create four more folders within that called "config", "controllers", "models" and "routes".

This is how we create the project structure for our backend. Now, let's create our React project via create-react-app. Since React is used for the client side code, we can call our project "client". Make sure you are in the same folder level as your "server.js".

npx create-react-app client
copy
Now that you have your React project built, you will be running two different servers: your front end React server with live reloading and your Express server.

Now that we have the basic set up, let's create the rest of our project in the form of a "Hello World" full stack MERN application. Let's add a controller within the 'controllers' folder, called person.controller.js.

controllers/person.controller.js

module.exports.index = (request, response) => {
    response.json({
       message: "Hello World"
    });
}
copy
Next, in the routes folder, let's create the person.routes.js file.

routes/person.routes.js

const PersonController = require('../controllers/person.controller');
module.exports = function(app){
    app.get('/api', PersonController.index);
}
copy
Now, we have a route that ends in 'api' and will simply return an object with a message equal to "Hello World". Let's link to this in our server.js:

server.js

const express = require('express');
const app = express();
require('./server/routes/person.routes')(app); // This is new
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
copy
Now, when we visit 'localhost:8000/api', we will get a JSON response of {message: "Hello World"}.

We have our back end set up, but let's display this in our front end.





Let's now start setting up our React project. Change directories into your React project, called client, and run the following:

npm install axios
copy
We are installing axios so we can easily make a request to our backend. Within the src folder, create a new file called Main.js. In the Main.js file, we will make an api call and display our message. We will be using the useEffect hook in order to make the api call and save the message in state.

client/src/Main.js

import React, { useEffect, useState } from 'react'
import axios from 'axios';
export default () => {
    const [ message, setMessage ] = useState("Loading...")
    useEffect(()=>{
        axios.get("http://localhost:8000/api")
            .then(res=>setMessage(res.data.message))       
    }, []);
    return (
        <div>
            <h2>Message from the backend: {message}</h2>
        </div>
    )
}
copy
We are setting the default message as "Loading...". Next, in your App.js file, you will need to insert the Main component as follows:

import React from 'react';
import Main from './Main';
function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}
export default App;
copy
At this point, you can start your server via nodemon server.js and your React app via npm run start in two different consoles. Once you have them both running, you should be able to visit 'localhost:3000'. Once you visit it, you will end up just seeing "Loading..." as your message. Why is that? This is because we are making a request to our server from a different origin. So, let's stop your express server and install an extra package within your server.

Cors

npm install cors
copy
This will install the ability to make cross-origin requests. Now, we will need to change our server.js as the following:

server.js

const express = require('express');
const cors = require('cors') // This is new
const app = express();
app.use(cors()) // This is new
require('./server/routes/person.routes')(app);
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
copy
Now we are able to make cross-origin requests in our project. When you refresh your React app, you should briefly see "Loading..." as the message, which will then be replaced by "Hello World". Congratulations! You have made your first MERN app. Next, we will start tying in our database.

In order to start a full stack MERN CRUD application, we will need to configure our database. Let's add a mongoose.config.js file in our server/config folder:

config/mongoose.config.js

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/crmdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));
copy
We can see that we are referencing our models folder. Let's start creating a Customer Relationship Management software and make a new model, Person.

models/person.model.js

const mongoose = require('mongoose');
const PersonSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String }
}, { timestamps: true });
module.exports.Person = mongoose.model('Person', PersonSchema);
copy
Next, we need to import our mongoose config file so it will fire up the server and our new person.routes file we can handle a post request to create a person. However, in order to process POST requests, we first need to add a couple of app.use statements with some express middleware.

Our server.js will now have a few more lines of code:

server.js

const express = require('express');
const cors = require('cors');
const app = express();
require('./server/config/mongoose.config'); // This is new
app.use(cors());
app.use(express.json()); // This is new
app.use(express.urlencoded({ extended: true })); // This is new
require('./server/routes/person.routes')(app);
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
copy
Now, in our controller, we can add a new method to handle the creation of our person:

controllers/person.controller.js

const { Person } = require('../models/person.model');
module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}
    // The method below is new
module.exports.createPerson = (request, response) => {
    const { firstName, lastName } = request.body;
    Person.create({
        firstName,
        lastName
    })
        .then(person => response.json(person))
        .catch(err => response.json(err));
}
copy
Now, let's update our routes:

const PersonController = require('../controllers/person.controller');
module.exports = function(app){
    app.get('/api', PersonController.index);
    app.post('/api/people', PersonController.createPerson);
}
copy
By adding this line, we can now create people by sending a post request to localhost:8000/api/people.

Let's look at the React side of things.

Let's tie in the creation to our React project. Within the src folder, let's add two more folders: views and components. Then, let's move Main.js to the views folder. We can change our Main.js to have a form, now. Within our components folder, let's create a new file called PersonForm.js. This component will be the form that we can add a person to and make a request to our API.

components/PersonForm.js

import React, { useState } from 'react'
import axios from 'axios';
export default () => {
    //keep track of what is being typed via useState hook
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState("");
    //handler when the form is submitted
    const onSubmitHandler = e => {
        //prevent default behavior of the submit
        e.preventDefault();
        //make a post request to create a new person
        axios.post('http://localhost:8000/api/people', {
            firstName,
            lastName
        })
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    }
    //onChange to update firstName and lastName
    return (
        <form onSubmit={onSubmitHandler}>
            <p>
                <label>First Name</label><br/>
                <input type="text" onChange={(e)=>setFirstName(e.target.value)} value={firstName}/>
            </p>
            <p>
                <label>Last Name</label><br/>
                <input type="text" onChange={(e)=>setLastName(e.target.value)} value={lastName}/>
            </p>
            <input type="submit"/>
        </form>
    )
}
copy
Now, we have a functional (albeit not a very interesting looking) form.

We just need to update our React project so that it shows up in the DOM. Change your Main.js file to the following:

views/Main.js

import React, { useEffect, useState } from 'react';
import PersonForm from '../components/PersonForm';
export default () => {
    return (
        <div>
           <PersonForm/>
        </div>
    )
}
copy
Now you can test out your form to see if it is working. You should be able to see the response in your console.

So far we have the ability to create people. However, how do we know if these people are actually in our database? We could manually check. Or, we could make a request to our api that will retrieve all of the people in our database for us.

Add a function to your controller file that will look like this:

server/controllers/person.controller.js

module.exports.getAllPeople = (request, response) => {
    Person.find({})
        .then(persons => response.json(persons))
        .catch(err => response.json(err))
}
copy
and add this to our routes:

// ...
app.get('/api/people', PersonController.getAllPeople);
// ...
copy
You can test this with Postman. We can now go back to our React front end. Let's create a new component, called PersonList.js.

components/PersonList.js

import React from 'react'
import axios from 'axios';
    
const PersonList = (props) => {
    return (
        <div>
            {props.people.map( (person, i) =>
                <p key={i}>{person.lastName}, {person.firstName}</p>
            )}
        </div>
    )
}
    
export default PersonList;
copy
We are just sending in our people and views/Main.js

import React, { useEffect, useState } from 'react'
import PersonForm from '../components/PersonForm';
import PersonList from '../components/PersonList';
    
const Main = (props) => {
    const [people, setPeople] = useState([]);
    const [loaded, setLoaded] = useState(false);
    
    useEffect(()=>{
        axios.get('http://localhost:8000/api/people')
            .then(res=>{
                setPeople(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    },[]);
    
    return (
        <div>
           <PersonForm/>
           <hr/>
           {loaded && <PersonList people={people}/>}
        </div>
    )
}
    
export default Main;
copy
We are loading all of the people in our main, and only outputting the list of people once we have gotten a response from the api. Next, we will need to create a new view that can show us the details of a particular person. We only have the first and last name of them, so it won't necessarily be that interesting. However, let's see how it works.

In our server, we need another method in our controller:

server/controllers/person.controller.js

module.exports.getPerson = (request, response) => {
    Person.findOne({_id:request.params.id})
        .then(person => response.json(person))
        .catch(err => response.json(err))
}
copy
And add another route:

app.get('/api/people/:id', PersonController.getPerson);
copy
Back to React. We will need to create a new file called Detail.js in our views folder:

views/Detail.js

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
    
const Detail = (props) => {
    const [person, setPerson] = useState({})
    const { id } = useParams();
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/people/' +id)
            .then(res => setPerson(res.data))
            .catch(err => console.error(err));
    }, []);
    
    return (
        <div>
            <p>First Name: {person.firstName}</p>
            <p>Last Name: {person.lastName}</p>
        </div>
    )
}
    
export default Detail;
copy
Since we have front end routing now, we will need to rework our src/App.js file in our React project:

First, run npm install react-router-dom@5 within your React project.

App.js

import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Main from './views/Main';
import Detail from './views/Detail';
    
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/people/">
            <Main />
          </Route>
          <Routh path="people/:id">
            <Detail />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
    
export default App;
copy
And now we should have a simple project that retrieves our data from our api.

Note: We will currently need to refresh our page in order for the new person to show up. We will be refactoring our code in Advanced MERN in order to achieve this.

Update

Let's look at how we can update items in our database. First, let's set up our API endpoint. Let's add a route:

app.put('/api/people/:id', PersonController.updatePerson);
copy
And then add a new method to the controller:

module.exports.updatePerson = (request, response) => {
    Person.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedPerson => response.json(updatedPerson))
        .catch(err => response.json(err))
}
copy
Next, let's look at how we can implement this in React: We will need to add a new view:

views/Update.js

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
    
const Update = (props) => {
    const { id } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/people/' + id)
            .then(res => {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
            })
    }, []);
    
    const updatePerson = e => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/people/' + id, {
            firstName,
            lastName
        })
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }
    
    return (
        <div>
            <h1>Update a Person</h1>
            <form onSubmit={updatePerson}>
                <p>
                    <label>First Name</label><br />
                    <input type="text" 
                    name="firstName" 
                    value={firstName} 
                    onChange={(e) => { setFirstName(e.target.value) }} />
                </p>
                <p>
                    <label>Last Name</label><br />
                    <input type="text" 
                    name="lastName"
                    value={lastName} 
                    onChange={(e) => { setLastName(e.target.value) }} />
                </p>
                <input type="submit" />
            </form>
        </div>
    )
}
    
export default Update;
copy
Let's talk about what we are doing here. First, we are making a request to our server to get the person with id equal to the one in the url. When this request resolves, we set our states to the response. We have defined an updatePerson method. This will send a PUT request to update the instance in the database.

Now, we can update our App.js in order to include another route.

...
// Your other routes
<Route path="/people/:id/edit">
    <Update />
</Route>
// ...
copy
Lastly, in your Detail.js, you can add the following snippet in order to link to the Edit page:

<Link to={"/people/" + person._id + "/edit"}>
    Edit
</Link>
copy
Delete

The last part of CRUD is delete. Let's look at how to do that.

We will add a route:

app.delete('/api/people/:id', PersonController.deletePerson);
copy
And then a method to our controller:

module.exports.deletePerson = (request, response) => {
    Person.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}
copy
Let's now add the functionality to our front end. With axios, we can simply make an onClick event for a delete button. Let's add this method to our PersonList.js:

components/PersonList.js

import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
    
const PersonList = (props) => {
    const { removeFromDom } = props;
    
    const deletePerson = (personId) => {
        axios.delete('http://localhost:8000/api/people/' + personId)
            .then(res => {
                removeFromDom(personId)
            })
            .catch(err => console.error(err));
    }
    
    return (
        <div>
            {props.people.map((person, idx) => {
                return <p key={idx}>
                    <Link to={"/" + person._id}>
                        {person.lastName}, {person.firstName}
                    </Link>
                    |
                    <button onClick={(e)=>{deletePerson(person._id)}}>
                        Delete
                    </button>
                </p>
            })}
        </div>
    )
}
    
export default PersonList;
copy
What are we doing here? We are sending a request to our api to actually delete our person. However, we will also need to remove the person from the DOM. At this point, we are simply sending the method as a callback. We will add this logic in our Main.js, so that we can change the people state.

views/Main.js

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PersonForm from '../components/PersonForm';
import PersonList from '../components/PersonList';
    
const Main = (props) => {
    const [people, setPeople] = useState([]);
    const [loaded, setLoaded] = useState(false);
    
    useEffect(()=>{
        axios.get('http://localhost:8000/api/people')
            .then(res=>{
                setPeople(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    },[]);
    
    const removeFromDom = personId => {
        setPeople(people.filter(person => person._id != personId));
    }
    
    return (
        <div>
           <PersonForm/>
           <hr/>
           {loaded && <PersonList people={people} removeFromDom={removeFromDom}/>}
        </div>
    );
}
    
export default Main;
