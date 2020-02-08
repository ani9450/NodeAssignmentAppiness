const model = require('../models/user');
const roleModel = require('../models/userRole');
const mongoose = require('mongoose');

const utils = require('../middlewares/utils');
const db = require('../middlewares/db');


/********************
 * Public functions *
 ********************/

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItems = async (req, res) => {
    try {
        console.log('userrrrrrrrrrrrr get items')
        db.getItems(req, model, {}, "userRole").then(result => {

            res.status(201).json({
                message: " GET SUCCESSFUL",
                data: result
            });
        })
    } catch (error) {
        utils.handleError(res, error)
    }
}

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItem = async (req, res) => {
    try {

        const id = { _id: req.params.id };
        let result = await db.getItem(id, model, "userRole");

        res.status(201).json({
            message: "GET SUCCESSFUL",
            data: result
        });

    } catch (error) {
        utils.handleError(res, error)
    }
}

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.updateItem = async (req, res) => {
    try {
        let body = Object.create(req.body.users);
        const query = { email: body.email };
        const userInfo = await db.getItem(query, model, "");
        body._id = userInfo._id;
        body.userRole = userInfo.userRole;
        let result = await db.updateItem({ _id: body._id }, model, body);
        res.status(200).json({
            message: "UPDATE SUCCESSFUL",
            data: result
        })
    } catch (error) {
        console.log("error --", error.message)
        utils.handleError(res, error)
    }
}

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.createItem = async (req, res) => {
    try {

        let body = new model(req.body.users);

        const user = await db.getItems(null, model, null);
        let roleBody;
        if (user.length > 0) {
            roleBody = new roleModel({ _id: new mongoose.Types.ObjectId(), userRole: "DEFAULT" });
        }
        else {
            roleBody = new roleModel({ _id: new mongoose.Types.ObjectId(), userRole: "ADMIN" });
        }
        const saveRole = await db.createItem(roleBody);
        if (saveRole) {
            body.userRole = saveRole._id;
        }
        else {
            throw new Error({ name: "Custom Error", message: "Unable to Save User" })
        }

        const result = await db.createItem(body);

        res.status(201).json({
            message: "SUBMIT SUCCESSFUL",
            data: result
        });
        // }
    } catch (error) {
        utils.handleError(res, error)
    }
}

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.deleteItem = async (req, res) => {
    try {
        
        const id = { _id: req.params.id };
        const userInfo = await db.getItem(id, model);
        await db.deleteItem({ _id: userInfo.userRole }, roleModel);
        const result = await db.deleteItem(id, model);
        res.status(200).json({
            message: "DELETE SUCCESSFUL",
            data: result
        })
    } catch (error) {
        utils.handleError(res, error)
    }
}
