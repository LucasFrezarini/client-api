import { AwilixContainer } from "awilix";
import { container } from "../config/container";

abstract class Controller {
  protected container: AwilixContainer;

  constructor() {
    this.container = container;
  }
}

export { Controller };
