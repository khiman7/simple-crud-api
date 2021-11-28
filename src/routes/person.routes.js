const Router = require('../utils/router');
const PersonController = require('../controllers/person.controller');

const router = new Router();

router.get('/person', PersonController.getPersons);
router.get('/person/:id', PersonController.getPerson);
router.post('/person', PersonController.createPerson);
router.put('/person/:id', PersonController.updatePerson);
router.delete('/person/:id', PersonController.deletePerson);

module.exports = router;
