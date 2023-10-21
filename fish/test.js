const { genComment } = require("commentGen.js");

for (let index = 0; index < 100; index++) {
  log(genComment());
}
