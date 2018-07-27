import * as mongoose from "mongoose";

const { SchemaTypes } = mongoose;

const ContactSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: SchemaTypes.String,
  },

  lastName: {
    required: true,
    type: SchemaTypes.String,
  },

  email: {
    required: true,
    type: SchemaTypes.String,
  },

  deleted: {
    default: false,
    type: SchemaTypes.Boolean,
  },

  phones: [{
    number: {
      required: true,
      type: SchemaTypes.String,
    },
    sort: {
      default: "residential",
      required: true,
      type: SchemaTypes.String,
    },
  }],
}, {
  timestamps: true,
});

export { ContactSchema };
