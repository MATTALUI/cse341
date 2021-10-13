const express = require('express');
const OrdersController = require('../controllers/orders');
const { enforceUser, validateOrderPayload, checkOrderBelongsToUser } = require('../middleware');
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
router.post('/', enforceUser, validateOrderPayload, OrdersController.create);
router.get('/:orderId/cancel', enforceUser, checkOrderBelongsToUser, OrdersController.cancel);
// router.put('/:orderId', OrdersController.update);
// router.delete('/:orderId', OrdersController.destroy);

module.exports = router;
