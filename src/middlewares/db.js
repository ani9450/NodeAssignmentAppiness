const {
    buildSuccObject,
    buildErrObject,
    itemNotFound
} = require('../middlewares/utils');


/**
* Builds sorting
* @param {string} sort - field to sort from
* @param {number} order - order for query (1,-1)
*/
const buildSort = (sort, order) => {
    const sortBy = {}
    sortBy[sort] = order
    return sortBy
}


module.exports = {
    async getItems(req, model, query, populate) {
        return new Promise((resolve, reject) => {
            model.find({})
                .populate(populate)
                .sort('_id')
                .exec((err, items) => {
                    if (err) {
                        reject(buildErrObject(422, err.message))
                        //   buildErrObject(422, err.message);
                        //   throw new Error(err);
                    }
                   
                    resolve(items)
                })

            //  .sort('_id')
        })

    },

    /**
     * Gets item from database by id
     * @param {string} id - item id
     */
 
    async getItem(query, model, populate) {
        return new Promise((resolve, reject) => {
            model.findOne(query)
                .populate(populate)
                .exec((err, item) => {
                    itemNotFound(err, item, reject, 'NOT_FOUND')
                    resolve(item)
                })
        })
    },

    /**
     * Creates a new item in database
     * @param {Object} req - request object
     */
    async createItem(model) {
        return new Promise((resolve, reject) => {
            model.save((err, item) => {
                if (err) {
                    console.log("err---", err);
                    // reject(buildErrObject(422, err.message))
                    reject(buildErrObject(422, err))

                }
                resolve(item)
            })
        })
    },

    /**
     * Updates an item in database by id
     * @param {string} id - item id
     * @param {Object} req - request object
     */
    async updateItem(query, model, req) {
        return new Promise((resolve, reject) => {
            model.findByIdAndUpdate(
                query,
                req,
                {
                    new: true,
                    runValidators: true
                },
                (err, item) => {
                    itemNotFound(err, item, reject, 'NOT_FOUND')
                    resolve(item);
                }
            )
        })
    },

    /**
     * Deletes an item from database by id
     * @param {string} id - id of item
     */
    async deleteItem(id, model) {
        return new Promise((resolve, reject) => {
            model.findByIdAndRemove(id, (err, item) => {
                itemNotFound(err, item, reject, 'NOT_FOUND')
                resolve(buildSuccObject('DELETED'))
            })
        })
    }
}