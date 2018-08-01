import * as bcrypt from "bcrypt";
import { expect } from "chai";
import * as mongoose from "mongoose";
import * as sinon from "sinon";
import { configureTest } from "sinon-test";
import * as winston from "winston";
import { IUser } from "../../../app/interfaces/IUser";
import AccountService from "../../../app/services/AccountService";
import AuthService from "../../../app/services/AuthService";
import UserService from "../../../app/services/UserService";

const sinonTest = configureTest(sinon);

afterEach(() => {
  sinon.restore();
});

let dbMock: sinon.SinonMock;
let UserServiceMock;
let AuthServiceMock;
let accountServiceConstructorArgs;

beforeEach(() => {
  dbMock = sinon.mock(mongoose.connection);
  sinon.mock(winston.createLogger);

  UserServiceMock = sinon.stub();
  AuthServiceMock = sinon.stub();

  accountServiceConstructorArgs = {
    authService: AuthServiceMock,
    db: mongoose.connection,
    logger: winston.createLogger(),
    userService: UserServiceMock,
  };
});

describe("Account service unit test", () => {
  describe("login()", () => {
    it("Should returns the token when the user passed is valid", sinonTest(async () => {
      const user: IUser = {
        password: "1234",
        username: "test",
      };

      const passwordToReturn = await bcrypt.hash(user.password, 10);

      const token = "mockedToken";

      UserServiceMock.find = sinon.stub().callsFake(() => Promise.resolve({
        _id: "a1b2c3d4",
        password: passwordToReturn,
        username: "test",
      }));

      AuthServiceMock.generateToken = sinon.stub().callsFake(() => Promise.resolve("mockedToken"));

      const accountService = new AccountService(accountServiceConstructorArgs);

      const response = await accountService.login(user);

      expect(response).to.has.all.keys(["msg", "success", "token"]);
      expect(response.token).to.be.equals("mockedToken");

      sinon.assert.calledWith(UserServiceMock.find, {username: user.username}, ["_id", "username", "password"]);
      sinon.assert.calledWith(AuthServiceMock.generateToken, {id: "a1b2c3d4", username: user.username});
    }));

    it("Shouldn't returns the token when the password is wrong", sinonTest(async () => {
      const user: IUser = {
        password: "incorrectPass",
        username: "test",
      };

      const passwordToReturn = await bcrypt.hash("test", 10);

      const token = "mockedToken";

      UserServiceMock.find = sinon.stub().callsFake(() => Promise.resolve({
        _id: "a1b2c3d4",
        password: passwordToReturn,
        username: "test",
      }));

      AuthServiceMock.generateToken = sinon.stub().callsFake(() => Promise.resolve("mockedToken"));

      const accountService = new AccountService(accountServiceConstructorArgs);

      const response = await accountService.login(user);

      expect(response).to.not.has.key("token");
      expect(response.success).to.be.equals(false);
      expect(response.msg).to.be.equals("Invalid password");

      sinon.assert.notCalled(AuthServiceMock.generateToken);
    }));

    it("Shouldn't return password if username doesn't exists", sinonTest(async () => {
      const user: IUser = {
        password: "test",
        username: "doesn't exists",
      };

      const passwordToReturn = await bcrypt.hash("test", 10);

      const token = "mockedToken";

      UserServiceMock.find = sinon.stub().callsFake(() => Promise.resolve(null));

      AuthServiceMock.generateToken = sinon.stub().callsFake(() => Promise.resolve("mockedToken"));

      const accountService = new AccountService(accountServiceConstructorArgs);

      const response = await accountService.login(user);

      expect(response).to.not.has.key("token");
      expect(response.success).to.be.equals(false);
      expect(response.msg).to.be.equals("Invalid username");

      sinon.assert.notCalled(AuthServiceMock.generateToken);
    }));
  });
});
