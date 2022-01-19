const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  classsp: {
    type: String,
  },
  work: {
    type: String,
  },
  company: {
    type: String,
  },
  experience: {
    type: String,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  subject: {
    type: String
  },
  session: [
      {
        type: Schema.Types.ObjectId,
        ref:'session'
      }
    ]
});
const User = new mongoose.model("user", UserSchema);
User.createIndexes();
module.exports = User;
