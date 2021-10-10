const express = require('express');

const BooksController = require('../controllers/books');
const { enforceUser } = require('../middleware');
const router = express.Router();


///////////////////////////////////////////////////////////////////////////////
// UI ROUTES                                                                 //
///////////////////////////////////////////////////////////////////////////////
router.get('/', BooksController.index);
router.get('/new', enforceUser, BooksController.new);
// router.get('/:bookId', BooksController.show);
router.get('/:bookId/edit', enforceUser, BooksController.edit);

///////////////////////////////////////////////////////////////////////////////
// API ROUTES                                                                //
///////////////////////////////////////////////////////////////////////////////
router.post('/', enforceUser, BooksController.create);
router.post('/:bookId', enforceUser, BooksController.update);
router.delete('/:bookId', enforceUser, BooksController.destroy);

module.exports = router;
