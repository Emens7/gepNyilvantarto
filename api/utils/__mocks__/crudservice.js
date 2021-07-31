let mockData = [];

const setData = (d) => mockData = d;

const service = {

    create: jest.fn((data) => {
        const newData = {
            _id: Math.random().toString(36).substring(2),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        mockData.push(newData);
        return newData;
    }),

    update: jest.fn(({ _id }, data) => {
        const itemIndex = mockData.findIndex(i => i._id === _id);
        if (itemIndex < 0) {
            return null;
        }

        const updatedData = {
            _id: mockData[itemIndex]._id,
            ...data,
            createdAt: mockData[itemIndex].createdAt,
            updatedAt: new Date().toISOString()
        };

        mockData[itemIndex] = updatedData;

        return updatedData;
    }),

    delete: jest.fn(({ _id }) => {

        const itemIndex = mockData.findIndex(i => i._id === _id);
        if (itemIndex < 0) {
            return null;
        }
        mockData.splice(itemIndex, 1);
        return {}; 
    }),

    find: jest.fn(() => mockData),

    findById: jest.fn((id) => {
        const result = mockData.find(i => i._id === id);
        return result ? result : null;
    })

};

const createService = () => service;

module.exports = { createService, setData };