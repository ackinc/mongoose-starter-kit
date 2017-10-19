const isEmail = require('validator').isEmail;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {type: String, lowercase: true, unique: true, sparse: true, validate: {
        isAsync: false,
        validator: isEmail,
        message: "{VALUE} is not a valid email address"
    }},
    mobile_number: {type: String, unique: true, sparse: true, match: /^\d{10}$/},
    password: { type: String, required: true },
    name: {type: String, minlength: 1, required: true},
    sex: {type: String, enum: ['male', 'female']},
    display_pic_id: String
});

userSchema.pre('validate', function (next) {
    if (!this.email && !this.mobile_number) {
        next(new Error('One of email address and mobile number must be present'));
    } else {
        next();
    }
});

module.exports = userSchema;
