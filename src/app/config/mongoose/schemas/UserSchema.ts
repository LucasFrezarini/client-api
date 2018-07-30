import * as mongoose from "mongoose";

const { SchemaTypes } = mongoose;

const userSchema = new mongoose.Schema({
  password: {
    required: true,
    type: SchemaTypes.String,
  },
  username: {
    required: true,
    type: SchemaTypes.String,
  },
});

export { userSchema };
