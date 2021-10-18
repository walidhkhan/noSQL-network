const { User } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find()
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // get one user by id
    getUserById(req, res) {
        User.findOne({ _id: req.params.id })
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // createUser
    createUser(req, res) {
        User.create(req.body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // update user by id--------------
    // updateUser(req, res) {
    //     User.findOneAndUpdate(
    //         { _id: req.params.id },
    //         { $set: req.body },
    //         { new: true, runValidators: true }
    //     )
    //         .then(dbUserData => res.json(dbUserData))
    //         .catch(err => {
    //             console.log(err);
    //             res.status(500).json(err);
    //         });
    // },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },


    // delete user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // add friend
    addFriend({ params }, res) {
        // add friendId to userIds friend list
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => res.json(dbUserData))
        // add userId to friendId's friend list
        User.findOneAndUpdate(
            { _id: params.friendId },
            { $addToSet: { friends: params.userId } },
            { new: true, runValidators: true })
            .then(dbUserData2 => res.json(dbUserData2))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // delete friend
    deleteFriend({ params }, res) {
        // delete friendId from userId's friend list
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => res.json(dbUserData))
        // delete userId from friendId's friend list
        User.findOneAndUpdate(
            { _id: params.friendId },
            { $pull: { friends: params.userId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData2 => res.json(dbUserData2))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }

};

module.exports = userController;