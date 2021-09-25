module.exports = {
  handleParsablePromises: (res, rej) => (err, rawJSONData) =>
    err ? rej(err) : res(JSON.parse(rawJSONData)),
};
