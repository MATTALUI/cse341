const { v4: uuidv4 } = require('uuid');

function User({ username, email, phone, firstName, lastName }){
  this.id = uuidv4();
  this.username = username;
  this.email = email;
  this.firstName = firstName;
  this.lastName = lastName;
}

User.prototype.toString = function (){
  return `${this.firstName} ${this.lastName}`;
};


module.exports = {
  User,
};
