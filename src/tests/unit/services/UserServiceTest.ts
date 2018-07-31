import * as bcrypt from "bcrypt";
import { expect } from "chai";
import * as mongoose from "mongoose";
import * as sinon from "sinon";
import { configureTest } from "sinon-test";
import * as winston from "winston";
import { IUser } from "../../../app/interfaces/IUser";
import UserService from "../../../app/services/UserService";

const sinonTest = configureTest(sinon);

afterEach(() => {
  sinon.restore();
});

describe("User service unit test", () => {
  describe("create()", () => {
    it("Should call the method create from the model", sinonTest(async () => {
      const dbMock = sinon.mock(mongoose.connection);
      const modelStub: {[k: string]: any} = sinon.stub(mongoose, "model");

      modelStub.create = sinon.stub();

      dbMock.expects("model").once()
        .withArgs("user")
        .returns(modelStub);

      sinon.mock(winston.createLogger);

      const userService = new UserService({ db: mongoose.connection, logger: winston.createLogger()});

      const user: IUser = {
        password: "123",
        username: "test",
      };

      await userService.create(user);

      dbMock.verify();

      sinon.assert.called(modelStub.create);
    }));

    it("Should pass the salted password to the method create", sinonTest(async () => {
      const dbMock = sinon.mock(mongoose.connection);
      const modelStub: {[k: string]: any} = sinon.stub(mongoose, "model");

      /* When the stub will be invoked, it will only a promise that resolves
         with the value passed */
      modelStub.create = sinon.stub().callsFake((v) => Promise.resolve(v));

      dbMock.expects("model").once()
        .withArgs("user")
        .returns(modelStub);

      sinon.mock(winston.createLogger);

      const userService = new UserService({ db: mongoose.connection, logger: winston.createLogger()});

      const user: IUser = {
        password: "123",
        username: "test",
      };

      const createdUser = await userService.create(user);

      expect(user.password).to.be.not.equals(createdUser.password);

      const isPasswordEquals = await bcrypt.compare(user.password, createdUser.password);
      // tslint:disable-next-line:no-unused-expression
      expect(isPasswordEquals).to.be.true;
    }));
  });

  describe("findById()", () => {
    it("Should call the method findById from the model with the specified ID", sinonTest(async () => {
      const dbMock = sinon.mock(mongoose.connection);
      const modelStub: {[k: string]: any} = sinon.stub(mongoose, "model");

      modelStub.findById = sinon.stub();

      dbMock.expects("model").once()
        .withArgs("user")
        .returns(modelStub);

      sinon.mock(winston.createLogger);

      const userService = new UserService({ db: mongoose.connection, logger: winston.createLogger()});

      const id = "a1b2c3d4";

      const user = await userService.findById(id);

      sinon.assert.calledWith(modelStub.findById, id);
    }));
  });
});
