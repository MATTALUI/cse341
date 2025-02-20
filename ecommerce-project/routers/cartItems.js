const express = require('express');
const CartItemsController = require('../controllers/cartItems');
const { enforceUser } = require('../middleware');
const router = express.Router();

///////////////////////////////////////////////////////////////////////////////
// UI ROUTES                                                                 //
///////////////////////////////////////////////////////////////////////////////
router.get('/', enforceUser, CartItemsController.index);
// router.get('/new', CartItemsController.new);
router.get('/:cartItemId', CartItemsController.show);

///////////////////////////////////////////////////////////////////////////////
// API ROUTES                                                                //
///////////////////////////////////////////////////////////////////////////////
router.post('/', enforceUser, CartItemsController.create);
router.put('/:cartItemId', CartItemsController.update);
router.delete('/:itemId', CartItemsController.destroy);

module.exports = router;
