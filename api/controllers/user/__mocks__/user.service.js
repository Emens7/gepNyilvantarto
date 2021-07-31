let data = [];

exports.setData = d => data = d;

exports.create = jest.fn((userData) => {
    const user = {
        _id: Math.random().toString(36).substring(2),
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    data.push(user);
    return user;
});

exports.findByEmail = jest.fn((email) => {
    const result = data.find(i => i.email === email);
    if (result) {
        return {
            ...result,
            checkPassword: () => true
        }
    }

    return null;
});

exports.find = jest.fn(() => {
    return data;
});

exports.findById = jest.fn((id) => {
    const item = data.find(i => i._id === id);
    return item ? item : null;
});
