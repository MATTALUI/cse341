const { v4: uuidv4 } = require('uuid');

function Book({ title, authorName, summary } = {}){
  this.id = uuidv4();
  this.title = title;
  this.authorName = authorName;
  this.summary = summary;
}


module.exports = {
  Book,
};
