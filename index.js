const esm = require("esm")(module);
const server = "./server.js";

module.exports = esm(server);
