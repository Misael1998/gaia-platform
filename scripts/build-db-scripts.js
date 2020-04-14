const fs = require("fs");
const path = require("path");

const fnPath = path.join(__dirname, "../sql/functions");
const spPath = path.join(__dirname, "../sql/sp");

fs.readdir(spPath, (err, files) => {
  if (err) {
    console.log("something went wrong");
    process.exit(1);
  }
  let unified = `
  USE pyflor
  GO
  `;
  for (file of files) {
    const tmp = fs.readFileSync(`${spPath}/${file}`);
    unified += `${tmp}\n`;
  }

  const writeStream = fs.createWriteStream(
    path.join(__dirname, "../sql/build/sp.sql")
  );

  writeStream.write(unified);
});

fs.readdir(fnPath, (err, files) => {
  if (err) {
    console.log("something went wrong");
    process.exit(1);
  }
  let unified = `
  USE pyflor
  GO
  `;
  for (file of files) {
    const tmp = fs.readFileSync(`${fnPath}/${file}`);
    unified += `${tmp}\n`;
  }

  const writeStream = fs.createWriteStream(
    path.join(__dirname, "../sql/build/fn.sql")
  );

  writeStream.write(unified);
});
