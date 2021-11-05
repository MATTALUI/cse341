const fs = require('fs');
const path = require('path');

function Item(item={}) {
  this.tags = item.tags;
  this.imageUrl = item.imageUrl;
  this.price = item.price;
  this.name = item.name;
  this.description = item.description;
}

Item.getPage = function(pageNumber) {
  const itemsPerPage = 10;
  return new Promise((res, rej) => {
    fs.readFile(path.join(__dirname, '..', 'db/ta03.json'), 'utf8' , (err, data) => {
      if (err) {
        console.error(err);
        return rej(err);
      }
      const itemsData = JSON.parse(data);
      const totalPages = Math.ceil(itemsData.length / itemsPerPage);
      const startIndex = (pageNumber - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const items = itemsData.slice(startIndex, endIndex).map(i => new Item(i));


      return res({
        items,
        totalPages
      });
    });
  });
};

module.exports = Item;
