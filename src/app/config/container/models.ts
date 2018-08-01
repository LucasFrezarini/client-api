import * as awilix from "awilix";

export function registerModels(container: awilix.AwilixContainer) {
  const models = [
    container.resolve("contactsModel"),
    container.resolve("userModel"),
  ];

  container.register("models", awilix.asValue(models));

  return models;
}
