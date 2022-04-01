let  {people} = require("../data.js");

const getPeople = (req, res) => {
	res.status(200).json({success: true, data: people});
}

const createPerson = (req, res) => {
	const {name} = req.body;
	if (!name) {
		res.status(400).json({success: false, msg: "Provide name"});
	}
	res.status(201).json({success: true, person: name});
}

const postMan = (req, res) => {
	const {name} = req.body;
	if (!name) {
		res.status(400).json({success: false, msg: "Provide name"});
	}
	res.status(201).json({success: true, person: [...people, name]});
}

const updatePerson = (req, res) => {
	const {id} = req.params;
	const {name} = req.body;
	const person = people.find((person) => person.id === Number(id))
	if (!person) {
		res.status(404).json({success: false, msg: `no person with id ${id}`});
	}
	const newPeople = people.map((person) => { if (person.id === Number(id)) {
			person.name = name;
		}
	return person;
	});
	res.status(200).json({success: true, data: newPeople});
}

const deletePerson = (req, res) => {
	const person = people.find((person) => person.id === Number(req.params.id));
	if (!person) {
		res.status(404).json({success: false, msg: `no person with id ${req.params.id}`});
	}
	const newPeople = people.filter((person) => person.id !== Number(req.params.id));
	res.status(200).json({success: true, data: newPeople});
}

module.exports = {getPeople, createPerson, postMan, updatePerson, deletePerson};

