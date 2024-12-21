const http = require("http");
const { URL } = require("url");

const routes = require("./routes");

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);

  console.log(
    `Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`
  );

  //a mesma coisa que let pathname = parsedUrl.pathname
  let { pathname } = parsedUrl;
  let id = null;

  //filter(Boolean) retira as strings vazias que retornaram do split
  let splitEndpoint = pathname.split("/").filter(Boolean);

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }

  const route = routes.find(
    (routeObj) =>
      routeObj.endpoint === pathname && routeObj.method === request.method
  );

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { id };

    route.handler(request, response);
  } else {
    response.writeHead(404, { "content-type": "application/json" });
    response.end(`Cannot ${request.method} ${request.url}`);
  }
});

server.listen(3000, () =>
  console.log("Server started at http://localhost:3000/")
);
