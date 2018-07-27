import * as mongoose from "mongoose";

abstract class Model {
  public abstract getModelName(): string;
  public abstract getSchema(): mongoose.Schema;

  public register(db: mongoose.Connection) {
    db.model(this.getModelName(), this.getSchema(), this.getCollectionName());
  }

  protected getCollectionName() {
    return this.getModelName();
  }
}

export { Model };
