const express = require('express');

const BooksController = require('../controllers/books');
const { enforceUser, checkBookBelongsToUser, validateBookPayload } = require('../middleware');
const router = express.Router();


///////////////////////////////////////////////////////////////////////////////
// UI ROUTES                                                                 //
///////////////////////////////////////////////////////////////////////////////
router.get('/', BooksController.index);
router.get('/new', enforceUser, BooksController.new);
// router.get('/:bookId', BooksController.show);
router.get('/:bookId/edit', enforceUser, checkBookBelongsToUser, BooksController.edit);

///////////////////////////////////////////////////////////////////////////////
// API ROUTES                                                                //
///////////////////////////////////////////////////////////////////////////////
router.post('/', enforceUser, validateBookPayload, BooksController.create);
router.post('/:bookId', enforceUser, checkBookBelongsToUser, validateBookPayload, BooksController.update);
router.delete('/:bookId', enforceUser, checkBookBelongsToUser, BooksController.destroy);

module.exports = router;
