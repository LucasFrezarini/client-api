import { expect } from "chai";
import * as mongoose from "mongoose";
import * as sinon from "sinon";
import { configureTest } from "sinon-test";
import * as winston from "winston";
import { IContact } from "../../../../app/interfaces/IContact";
import ContactsService from "../../../../app/services/ContactsService";
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

  describe("find()", () => {
    it("Should call find with the paramaters passed for the function", sinonTest(
      async () => {
        const dbMock = sinon.mock(mongoose.connection);
        const modelStub: {[k: string]: any} = sinon.stub(mongoose, "model");

        modelStub.find = sinon.stub();

        dbMock.expects("model").once()
          .withArgs("contact")
          .returns(modelStub);

        sinon.mock(winston.createLogger);
        const contactsService = new ContactsService({ db: mongoose.connection, logger: winston.createLogger()});

        const criteria = { deleted: false };
        const fields = ["firstName", "lastName"];
        const options = {
          sort: {
            createdAt: -1,
          },
        };

        contactsService.find(criteria, fields, options);

        dbMock.verify();

        sinon.assert.calledWith(modelStub.find, criteria, fields, options);
      },
    ));
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

  describe("update()", () => {
    it("Should update the contact in the database and return the updated data", sinonTest(
      async () => {
        const dbMock = sinon.mock(mongoose.connection);
        const modelStub: {[k: string]: any} = sinon.stub(mongoose, "model");

        const id = "a3dv675c";

        const contact: IContact = {
          email: "lucas.update@gmail.com",
          firstName: "Lucas",
          lastName: "Update",
        };

        modelStub.findByIdAndUpdate = sinon.stub().returns(contact);

        dbMock.expects("model").once()
          .withArgs("contact")
          .returns(modelStub);

        sinon.mock(winston.createLogger);
        const contactsService = new ContactsService({ db: mongoose.connection, logger: winston.createLogger()});

        const updatedContact = contactsService.update(id, contact);

        expect(updatedContact).to.be.equals(contact);

        dbMock.verify();

        sinon.assert.calledWith(modelStub.findByIdAndUpdate, id, contact);
      },
    ));
  });
});
