import { expect } from "chai";
import * as mongoose from "mongoose";
import * as sinon from "sinon";
import { configureTest } from "sinon-test";
import * as winston from "winston";
import { IContact } from "../../../../app/api/contacts/ContactsModel";
import ContactsService from "../../../../app/api/contacts/ContactsService";
const sinonTest = configureTest(sinon);

afterEach(() => {
  sinon.restore();
});

describe("Contacts service unit test", () => {
  describe("findAll()", () => {
    it("Should call the method find of database", sinonTest(async () => {
      const dbMock = sinon.mock(mongoose.connection);
      const modelStub: {[k: string]: any} = sinon.stub(mongoose, "model");

      modelStub.find = sinon.stub();

      dbMock.expects("model").once()
        .withArgs("contact")
        .returns(modelStub);

      sinon.mock(winston.createLogger);
      const contactsService = new ContactsService({ db: mongoose.connection, logger: winston.createLogger()});

      contactsService.findAll();

      dbMock.verify();

      sinon.assert.calledWith(modelStub.find, {deleted: false});
    }));
  });

  describe("create()", () => {
    it("Should call the method create with the passed parameters to save in the database", sinonTest(
      async () => {
        const dbMock = sinon.mock(mongoose.connection);
        const modelStub: {[k: string]: any} = sinon.stub(mongoose, "model");

        modelStub.create = sinon.stub();

        dbMock.expects("model").once()
          .withArgs("contact")
          .returns(modelStub);

        sinon.mock(winston.createLogger);
        const contactsService = new ContactsService({ db: mongoose.connection, logger: winston.createLogger()});

        const contact: IContact = {
          email: "lucas.frezarini@gmail.com",
          firstName: "Lucas",
          lastName: "Frezarini",
        };

        contactsService.create(contact);

        dbMock.verify();

        sinon.assert.calledWith(modelStub.create, contact);
      },
    ));
  });
});
