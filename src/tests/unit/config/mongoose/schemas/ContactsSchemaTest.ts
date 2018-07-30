import { expect } from "chai";
import * as mongoose from "mongoose";
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

  it("Should throw error if lastName is empty", (done) => {
    const Schema = mongoose.model("contact", ContactSchema);
    const contact = new Schema();

    contact.validate((err) => {
      // tslint:disable-next-line:no-unused-expression
      expect(err.errors.lastName).to.exist;
      done();
    });
  });

  it("Should throw error if email is empty", (done) => {
    const Schema = mongoose.model("contact", ContactSchema);
    const contact = new Schema();

    contact.validate((err) => {
      // tslint:disable-next-line:no-unused-expression
      expect(err.errors.email).to.exist;
      done();
    });
  });

  it("Deleted value should be false by default", () => {
    const Schema = mongoose.model("contact", ContactSchema);
    const contact = new Schema() as any;

    // tslint:disable-next-line:no-unused-expression
    expect(contact.deleted).to.be.false;
  });

  it("Should require phone number if a phone item is passed to the phones array", (done) => {
    const Schema = mongoose.model("contact", ContactSchema);
    const contact = new Schema() as any;

    contact.phones.push({});

    contact.validate((err) => {
      // tslint:disable-next-line:no-unused-expression
      expect(err.errors["phones.0.number"]).to.exist;
      done();
    });
  });

  it("Sort of phone must be 'residential' by default", () => {
    const Schema = mongoose.model("contact", ContactSchema);
    const contact = new Schema() as any;

    contact.phones.push({});

    expect(contact.phones[0].sort).to.be.equals("residential");
  });
});
