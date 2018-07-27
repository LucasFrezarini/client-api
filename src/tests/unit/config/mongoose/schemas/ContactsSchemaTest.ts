import { expect } from "chai";
import * as mongoose from "mongoose";
import * as winston from "winston";
import { ContactSchema } from "../../../../../app/config/mongoose/schemas/ContactsSchema";

describe("Contacts Schema Unit Test", () => {
  it("Should throw error if firstName is empty", (done) => {
    const Schema = mongoose.model("contact", ContactSchema);
    const contact = new Schema();

    contact.validate((err) => {
      // tslint:disable-next-line:no-unused-expression
      expect(err.errors.firstName).to.exist;
      done();
    });
  });
});
