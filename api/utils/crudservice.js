//Generic CRUD service
const createService = (Model) => {
    return {
        create: async (data) => {

            delete data._id;
            delete data.createdAt;
            delete data.updatedAt;

            const item = new Model(data);
            return await item.save();
        },

        update: async (filter, data) => {

            delete data._id;
            delete data.createdAt;
            delete data.updatedAt;

            const oldItem = await Model.findOne(filter).exec();

            if (!oldItem) {
                return null;
            }

            const updatedData = {
                ...data,
                createdAt: oldItem.createdAt
            };

            const item = await Model
                .findOneAndUpdate(filter, updatedData,
                    { new: true, overwrite: true, timestamps: { updatedAt: true } }
                )
                .exec();
            return item;
        },

        delete: async (filter) => {
            return await Model.findOneAndDelete(filter).exec();
        },
        
        find: async (filter = {}, page = 1, perPage = 25) => {
            const items = await Model
                .find(filter)
                .limit(perPage)
                .skip((page - 1) * perPage)
                .sort({ createdAt: 'desc' })
                .exec();
            return items;
        },
        
        findById: async (id) => {
            const item = await Model.findById(id).exec();
            return item;
        }
    };
}

module.exports = { createService };