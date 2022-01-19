const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "registers",
  },
});
module.exports = mongoose.model("address", addressSchema);
