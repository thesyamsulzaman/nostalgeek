const fs = require('fs');

class StorageService {
  constructor(folder) {
    this._folder = folder;

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  generateFileName(meta) {
    return `${+new Date()}-${meta.filename}`;
  }

  writeFile(file, fileName) {
    const path = `${this._folder}/${fileName}`;

    const fileStream = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => reject(error));
      file.pipe(fileStream);
      file.on('end', () => resolve(fileName));
    });
  }
}

module.exports = StorageService;
