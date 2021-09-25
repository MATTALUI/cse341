const express = require('express');
const CartItemsController = require('../controllers/cartItems');
const router = express.Router();

///////////////////////////////////////////////////////////////////////////////
// UI ROUTES                                                                 //
///////////////////////////////////////////////////////////////////////////////
router.get('/', CartItemsController.index);
// router.get('/new', CartItemsController.new);
// router.get('/:itemId', CartItemsController.show);

///////////////////////////////////////////////////////////////////////////////
// API ROUTES                                                                //
///////////////////////////////////////////////////////////////////////////////
// router.post('', CartItemsController.create);
// router.delete('/:itemId', CartItemsController.destroy);

module.exports = router;
