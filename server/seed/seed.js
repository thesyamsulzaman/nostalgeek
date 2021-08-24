const faker = require("faker");
const { nanoid } = require("nanoid");
const fs = require("fs");

const tags = ["first-date", "pickup-line", "friendship", "job", "socializing"];

const topics = [];

for (let i = 0; i < 100; i++) {
  const id = `topic-${nanoid(16)}`;
  const user = faker.name.findName(); // Rowan Nikolaus
  const title = `${faker.lorem.sentence()} ${faker.commerce.color()}`;
  const description = faker.lorem.paragraph();
  const tagCollection = [
    tags[Math.floor(Math.random() * 4)],
    tags[Math.floor(Math.random() * 4)],
    tags[Math.floor(Math.random() * 4)],
  ];

  topics.push({
    id,
    title,
    description,
    votes: 0,
    user,
    tags: tagCollection,
  });
}

//fs.writeFile("db.json", JSON.stringify(topics), (error) => {
//if (error) {
//console.error(error);
//} else {
//console.log("file created!");
//fs.readFile("db.json", "utf8", (error, file) => {
//if (error) {
//console.error(error);
//} else {
//console.log(JSON.parse(file));
//}
//});
//}
//});
fs.readFile("db.json", "utf8", (error, file) => {
  if (error) {
    console.error(error);
  } else {
    console.log(JSON.parse(file));
  }
});

// Create file
/* fs.writeFile('example.txt', 'This is an example', (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log('file created!');
    fs.readFile('example.txt', 'utf8', (error, file) => {
      if (error) {
        console.error(error);
      } else {
        console.log(file);
      }
    })
  }
}) */

// Rename file
/* fs.rename('example.txt', 'example2.txt', error => {
  if (error) {
    console.error(error);
  } else {
    console.log('Successfully renamed file');
  }
}); */

// Appending data to file
/* fs.appendFile('example2.txt', 'Some data beind appended', error => {
  if (error) {
    console.error(error);
  } else {
    console.log('Successfully appended data to file');
  }
}); */

// Deleting file
//fs.unlink('example2.txt', error => {
//if (error) {
//console.error(error);
//} else {
//console.log('Successfully deleted file');
//}
//});
