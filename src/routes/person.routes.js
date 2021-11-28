const Router = require('../utils/router');
const PersonController = require('../controllers/person.controller');

const router = new Router();

router.get('/person', PersonController.getPersons);
router.post('/person', PersonController.createPerson);
router.put('/person', () => { console.log('update some person'); });
router.delete('/person', () => { console.log('delete some person'); });

module.exports = router;
