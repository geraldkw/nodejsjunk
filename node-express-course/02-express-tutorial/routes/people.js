const express = require('express');
const router = express.Router();
const {getPeople, createPerson, postMan, updatePerson, deletePerson} 
	= require('../controllers/people');

router.use(express.json());

router.get('/', getPeople )
router.route('/').get(getPeople).post(createPerson);
router.route('/postman').post(postMan);
router.route('/:id').put(updatePerson).delete(deletePerson);

module.exports = router;
