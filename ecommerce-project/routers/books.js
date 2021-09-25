const express = require('express');
const BooksController = require('../controllers/books');
const router = express.Router();

///////////////////////////////////////////////////////////////////////////////
// UI ROUTES                                                                 //
///////////////////////////////////////////////////////////////////////////////
router.get('/', BooksController.index);
router.get('/new', BooksController.new);
router.get('/:bookId', BooksController.show);
router.get('/:bookId/edit', BooksController.edit);

///////////////////////////////////////////////////////////////////////////////
// API ROUTES                                                                //
///////////////////////////////////////////////////////////////////////////////
router.post('', BooksController.create);
router.post('/:bookId', BooksController.update);
router.delete('/:bookId', BooksController.destroy);

module.exports = router;
