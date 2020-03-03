const mongoose = require("mongoose");
const validator = require("validator");

const shopifySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true
    }
  },
  { strict: false }
);

shopifySchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  return userObject;
};
const ShopifyData = mongoose.model("ShopifyData", shopifySchema);

module.exports = ShopifyData;
