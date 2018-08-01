import * as bcrypt from "bcrypt";
import { expect } from "chai";
import * as jwt from "jsonwebtoken";
import * as mongoose from "mongoose";
import * as sinon from "sinon";
import { configureTest } from "sinon-test";
import * as winston from "winston";
import AuthService from "../../../app/services/AuthService";
import UserService from "../../../app/services/UserService";

const sinonTest = configureTest(sinon);

afterEach(() => {
  dbMock.restore();
  sinon.restore();
});

let dbMock;
let authServiceConstructorArgs;

beforeEach(() => {
  dbMock = sinon.mock(mongoose.connection);
  sinon.mock(winston.createLogger);

  authServiceConstructorArgs = {
    db: mongoose.connection,
    logger: winston.createLogger(),
  };
});

describe("Auth service unit test", () => {
  describe("validate()", () => {
    it("Should return true if the decoded jwt has a ID and it's exist in the database", sinonTest(async () => {
      const decoded = {
        id: "a1b2c3d4",
      };

      const modelStub: {[k: string]: any} = sinon.stub(mongoose, "model");

      modelStub.findById = sinon.stub().callsFake((v) => Promise.resolve({
        _id: decoded.id,
      }));

      dbMock.expects("model").once()
        .withArgs("user")
        .returns(modelStub);

      const authService = new AuthService(authServiceConstructorArgs);

      const authenticated = await authService.validate(decoded, {});

      // tslint:disable-next-line:no-unused-expression
      expect(authenticated.isValid).to.be.true;

      sinon.assert.calledWith(modelStub.findById, decoded.id);

    }));

    it("Should return false if the decoded jwt has no id", sinonTest(async () => {
      const modelStub: {[k: string]: any} = sinon.stub(mongoose, "model");

      modelStub.findById = sinon.stub();

      dbMock.expects("model").never();

      sinon.mock(winston.createLogger);

      const authService = new AuthService(authServiceConstructorArgs);

      const authenticated = await authService.validate({}, {});

      // tslint:disable-next-line:no-unused-expression
      expect(authenticated.isValid).to.be.false;
    }));

    it("Should return false if decoded jwt has a id, but it doesn't exist on the database", sinonTest(async () => {
      const decoded = {
        id: "a1b2c3d4",
      };

      const modelStub: {[k: string]: any} = sinon.stub(mongoose, "model");

      modelStub.findById = sinon.stub().callsFake((v) => Promise.resolve(undefined));

      dbMock.expects("model").once()
        .withArgs("user")
        .returns(modelStub);

      sinon.mock(winston.createLogger);

      const authService = new AuthService(authServiceConstructorArgs);

      const authenticated = await authService.validate(decoded, {});

      // tslint:disable-next-line:no-unused-expression
      expect(authenticated.isValid).to.be.false;

      sinon.assert.calledWith(modelStub.findById, decoded.id);
    }));
  });

  describe("generateToken()", () => {
    it("Should generate a JWT with the data passed as parameter", sinonTest(async () => {
      sinon.mock(winston.createLogger);

      const authService = new AuthService(authServiceConstructorArgs);

      const data = {
        id: 1,
        name: "test",
      };

      process.env.SECRET_KEY = "secret";

      const token = await authService.generateToken(data);

      const decoded = jwt.verify(token, process.env.SECRET_KEY) as any;

      expect(decoded.id).to.be.equals(data.id);
      expect(decoded.name).to.be.equals(data.name);
    }));

    it("Should generate a JWT with expires date passed as parameter", sinonTest(async () => {
      sinon.mock(winston.createLogger);

      const authService = new AuthService(authServiceConstructorArgs);

      const data = {
        id: 1,
        name: "test",
      };

      const expiresIn = "1h";

      process.env.SECRET_KEY = "secret";

      const token = await authService.generateToken(data, expiresIn);

      const decoded = jwt.decode(token) as any;

      expect(decoded.exp).to.be.equals(3600);
    }));
  });
});
