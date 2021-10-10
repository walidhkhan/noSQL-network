const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtbyId,
    createThought, 
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

router  
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

router
    .route('/:id')
    .get(getThoughtbyId)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;

