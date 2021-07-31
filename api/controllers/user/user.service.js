const User = require('../../models/user');

exports.create = async (userData) => {
    delete userData._id;
    delete userData.createdAt;
    delete userData.updatedAt;

    const user = new User(userData);
    return await user.save();
}

exports.findByEmail = async (email) => {
    const user = await User.findOne({ email }).exec();
    return user;
}

exports.find = async (filter = {}, page = 1, perPage = 25) => {
    const items = await User
        .find(filter)
        .limit(perPage)
        .skip((page - 1) * perPage)
        .sort({ createdAt: 'desc' })
        .exec();
    return items;
}

exports.findById = async (id) => {
    const item = await User.findById(id).exec();
    return item;
};

