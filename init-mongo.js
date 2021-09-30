db.createUser({
  user: "user",
  pwd: "root",
  roles: [
    {
      role: "readWrite",
      db: "ecommerce-bookstore"
    }
  ]
});
