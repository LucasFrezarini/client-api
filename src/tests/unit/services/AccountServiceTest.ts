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

      const returnedToken = await accountService.login(user);

      expect(returnedToken).to.be.equals("mockedToken");

      sinon.assert.calledWith(UserServiceMock.find, {username: user.username}, ["_id", "username", "password"]);
      sinon.assert.calledWith(AuthServiceMock.generateToken, {id: "a1b2c3d4", username: user.username});
    }));
  });
});
