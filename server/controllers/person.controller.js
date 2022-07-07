const { Person } = require('../models/person.model');

module.exports.index = (request, response) => {
    response.json({
        message: 'hello mfker'
    });
}

module.exports.createPerson = (request, response) => {
    const { firstName, lastName, age, email } = request.body; // get the body of the requests
    Person.create({
        firstName,
        lastName,
        age,
        email
    })
        .then(person => response.json(person)) // person is the new person
        .catch(err => response.status(400).json(err)); // err is the error
}

module.exports.getAllPeople = (request, response) => { // get all people
    Person.find({}) // find all people
        .then(people => response.json(people)) // persons is an array of all people
        .catch(err => response.json(err))
}

module.exports.getPerson = (request, response) => {
    Person.findOne({ _id: request.params.id }) // find one person
        .then(person => {
            response.json(person)
            console.log("person ===>", person);
        }) // person is the one person
        .catch(err => response.json(err))
}

module.exports.updatePerson = (request, response) => {
    Person.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true }) // find one person and update it
        .then(updatePerson => response.json(updatePerson)) // updatedPerson is the updated person
        .catch(err => response.json(err))
}

module.exports.deletePerson = (request, response) => {
    Person.findOneAndDelete({ _id: request.params.id }) // find one person and delete it
        .then(deleteConfirmation => response.json(deleteConfirmation)) // removePerson is the removed person
        .catch(err => response.json(err))
}