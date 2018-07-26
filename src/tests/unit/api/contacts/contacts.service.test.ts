import { expect } from "chai";
import * as mongoose from "mongoose";
import * as sinon from "sinon";
import { configureTest } from "sinon-test";
import * as winston from "winston";
import ContactsService from "../../../../app/api/contacts/ContactsService";
const sinonTest = configureTest(sinon);

describe("Contacts service unit test", () => {
  describe("findAll()", () => {
    it("Should call the method find of database", sinonTest(async () => {
      const dbMock = sinon.mock(mongoose.connection);
      const modelStub = sinon.stub(mongoose, "model");

      const loggerMock = sinon.mock(winston.createLogger());
      const contactsService = new ContactsService({ db: dbMock, logger: loggerMock});

      contactsService.findAll();
    }));
  });
});
