const slowRequest = (speed) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success!'); // Yay! Everything went well!
  }, speed);
});

module.exports = slowRequest;
