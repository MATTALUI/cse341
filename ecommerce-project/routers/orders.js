const express = require('express');
const OrdersController = require('../controllers/orders');
const { enforceUser } = require('../middleware');
const router = express.Router();

///////////////////////////////////////////////////////////////////////////////
// UI ROUTES                                                                 //
///////////////////////////////////////////////////////////////////////////////
router.get('/', enforceUser, OrdersController.index);
// router.get('/new', OrdersController.new);
// router.get('/:orderId', OrdersController.show);

///////////////////////////////////////////////////////////////////////////////
// API ROUTES                                                                //
///////////////////////////////////////////////////////////////////////////////
router.post('/', enforceUser, OrdersController.create);
// router.put('/:orderId', OrdersController.update);
// router.delete('/:orderId', OrdersController.destroy);

module.exports = router;
