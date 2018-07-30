import { expect } from "chai";
import UserModel from "../../../../../app/config/mongoose/models/UserModel";
import { userSchema } from "../../../../../app/config/mongoose/schemas/UserSchema";

describe("User model unit test", () => {
  describe("getSchema()", () => {
    it("Should return the user schema", () => {
      const userModel = new UserModel();

      expect(userModel.getSchema()).to.be.equals(userSchema);
    });
  });

  describe("getModelName()", () => {
    it("Should return the model name 'user'", () => {
      const userModel = new UserModel();

      expect(userModel.getModelName()).to.be.equals("user");
    });
  });
});
