import { Server, Model } from "miragejs";
export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create("user", { name: "Evan You" });
      server.create("user", { name: "Sébastien Chopin" });
    },

    routes() {
      this.namespace = "api";

      this.get("/users", (schema) => {
        return schema.users.all();
      });
    },
  });

  return server;
}
