const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  id: String,
  name: String,
  username: String,
  email: String,
  avatar: String,
  gender: String,
  address: {
    street: String,
    suite: String,
    city: String,
    zipCode: String,
    geo: {
      lat: String,
      lng: String,
    },
  },
  phone: String,
  website: String,
});

module.exports = Customer = mongoose.model("customers", CustomerSchema);
