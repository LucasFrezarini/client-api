import { expect } from "chai";
import * as mongoose from "mongoose";
import { userSchema } from "../../../../../app/config/mongoose/schemas/UserSchema";

describe("User schema unit test", () => {
  it("Should throw error if username is empty", (done) => {
    const Model = mongoose.model("user", userSchema);
    const user = new Model();

    user.validate((err) => {
      // tslint:disable-next-line:no-unused-expression
      expect(err.errors.username).to.exist;
      done();
    });
  });

  it("Should throw error if password is empty", (done) => {
    const Model = mongoose.model("user", userSchema);
    const user = new Model();

    user.validate((err) => {
      // tslint:disable-next-line:no-unused-expression
      expect(err.errors.password).to.exist;
      done();
    });
  })
});
