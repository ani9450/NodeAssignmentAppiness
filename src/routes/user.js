const controller = require('../controllers/user');
const express = require('express');
const router = express.Router();
const trimRequest = require('trim-request');

/*
 * Users routes
 */

/*
 * Get items routea
 */
router.get(
  '/',
  trimRequest.all,
  controller.getItems
)

/*
 * Create new item route
 */
router.post(
  '/',
  trimRequest.all,
  controller.createItem
)

/*
 * Get item route
 */
router.get(
  '/:id',  
  trimRequest.all,
  controller.getItem
)


/*
 * Update item route
 */
router.put(
  '/',
  trimRequest.all,
  controller.updateItem,
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  trimRequest.all,
  controller.deleteItem
)

module.exports = router
