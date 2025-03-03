const fs = require("fs");

let a = 5;
let b = 6;

const sum = a + b;
const product = a * b;

let data = `Sum= ${sum}\n Product=${product}`;

fs.writeFile("output.txt", "writing something to the file", (err) => {
  if (err) throw err;

  console.log("new file created");
});
