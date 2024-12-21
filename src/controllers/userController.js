const users = require("../mocks/users");

module.exports = {
  listUsers(request, response) {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify(users));
  },
};
