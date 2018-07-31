import * as awilix from "awilix";

export function registerRoutes(container: awilix.AwilixContainer) {
  const routes = [].concat(
    container.resolve("contactsRoutes"),
    container.resolve("userRoutes"),
  );

  container.register("routes", awilix.asValue(routes));

  return routes;
}
