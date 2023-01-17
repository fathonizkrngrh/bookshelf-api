const Hapi = require("@hapi/hapi");
const routes = require("./router/index");

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
