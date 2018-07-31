import * as bcrypt from "bcrypt";
import { expect } from "chai";
import * as mongoose from "mongoose";
import * as sinon from "sinon";
import { configureTest } from "sinon-test";
import * as winston from "winston";
import AuthService from "../../../app/services/AuthService";

const sinonTest = configureTest(sinon);

afterEach(() => {
  sinon.restore();
});

describe("Auth service unit test", () => {
  describe("validate()", () => {
    it("Should return true if the decoded jwt has a ID and it's exist in the database", sinonTest(async () => {
      const decoded = {
        id: "a1b2c3d4",
      };

      const dbMock = sinon.mock(mongoose.connection);
      const modelStub: {[k: string]: any} = sinon.stub(mongoose, "model");

      modelStub.findById = sinon.stub().callsFake((v) => Promise.resolve({
        _id: decoded.id,
      }));

      dbMock.expects("model").once()
        .withArgs("user")
        .returns(modelStub);

      sinon.mock(winston.createLogger);

      const authService = new AuthService({ db: mongoose.connection, logger: winston.createLogger()});

      const authenticated = await authService.validate(decoded, {});

      // tslint:disable-next-line:no-unused-expression
      expect(authenticated.isValid).to.be.true;

      sinon.assert.calledWith(modelStub.findById, decoded.id);

    }));

    it("Should return false if the decoded jwt has no id", sinonTest(async () => {
      const dbMock = sinon.mock(mongoose.connection);
      const modelStub: {[k: string]: any} = sinon.stub(mongoose, "model");

      modelStub.findById = sinon.stub();

      dbMock.expects("model").never();

      sinon.mock(winston.createLogger);

      const authService = new AuthService({ db: mongoose.connection, logger: winston.createLogger()});

      const authenticated = await authService.validate({}, {});

      // tslint:disable-next-line:no-unused-expression
      expect(authenticated.isValid).to.be.false;
    }));

    it("Should return false if decoded jwt has a id, but it doesn't exist on the database", sinonTest(async () => {
      const decoded = {
        id: "a1b2c3d4",
      };

      const dbMock = sinon.mock(mongoose.connection);
      const modelStub: {[k: string]: any} = sinon.stub(mongoose, "model");

      modelStub.findById = sinon.stub().callsFake((v) => Promise.resolve(undefined));

      dbMock.expects("model").once()
        .withArgs("user")
        .returns(modelStub);

      sinon.mock(winston.createLogger);

      const authService = new AuthService({ db: mongoose.connection, logger: winston.createLogger()});

      const authenticated = await authService.validate(decoded, {});

      // tslint:disable-next-line:no-unused-expression
      expect(authenticated.isValid).to.be.false;

      sinon.assert.calledWith(modelStub.findById, decoded.id);
    }));
  });
});
