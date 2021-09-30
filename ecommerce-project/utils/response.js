module.exports = {
  logAndSendError: res => err => console.error(err) || res.sendStatus(500),
};
