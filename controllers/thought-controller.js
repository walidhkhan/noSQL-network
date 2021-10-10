const { Thought } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req,res) {
        Thought.find()
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}
}