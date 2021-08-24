const fs = require("fs");
const path = require("path");
let db;

fs.readFile("./db/db.json", "utf8", (error, file) => {
  if (error) {
    console.error(error);
  } else {
    db = JSON.parse(file);
  }
});

module.exports = {
  findAll: () => {
    return db;
  },
};
