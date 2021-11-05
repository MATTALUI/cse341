const Item = require('./model');
const Prove08Controller = {
  index: (req, res, next) => {
    const currentPage = Math.max(req.query.page || 1); // enforces positive page params;
    const nextPage = currentPage + 1;
    const prevPage = currentPage > 1 ? currentPage - 1 : null;

    Item.getPage(currentPage).then(pagination => res.render('index', {
      // TODO: ideally we'd want to limit going too far into the pages, but
      // there's 20 pages here...
      currentPage,
      nextPage,
      prevPage,
      ...pagination,
    }))
    .catch(() => res.sendStatus(500));
  },
};

module.exports = Prove08Controller;
