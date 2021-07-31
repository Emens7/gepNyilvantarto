const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    }
},
{
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.password
        }
    }
});

schema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const hash = await bcrypt.hash(this.password, 11);
    this.password = hash;
});

schema.methods.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const user = mongoose.model('User', schema);

module.exports = user;