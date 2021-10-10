const { Schema, model } = require('mongoose');


const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Username is required',
            trim: true
        },
        email: {
            type: String,
            
            unique: true,
            validate: {
                // validating with regex in order to keep validations consistent and avoid using hanging function
                validator: function (v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: 'Please entere a valid email address'
            },
            required: [true, 'Email is required']
        },

    }
)

const User = model('User', UserSchema);

module.exports = User;