const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const shortid = require("shortid");
shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
);
dotenv.config({ path: "../config.env" });
// items schema
const itemsSchema = new mongoose.Schema({
  desc: {
    type: String,
    required: true,
  },
  longDesc: {
    type: String,
  },
  rate: {
    rateValue: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
      enum: ["INR", "USD", "EUR", "GBP"],
    },
  },
  tax1: {
    type: Number,
    required: true,
  },
  tax2: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  groupName: {
    type: String,
    default: "N/A",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
});

// ------------------------------------------
const itemReference = new mongoose.Schema({
  data: {
    type: itemsSchema,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  rate: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
});

// creditNote schema
const creditNoteSchema = new mongoose.Schema({
  customer: {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  billingAddress: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: Number,
    },
    country: {
      type: String,
    },
  },

  shippingAddress: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
    country: {
      type: String,
    },
  },

  creditNoteNumber: {
    type: String,   
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  currency: {
    type: String,
    enum: ["INR", "USD"],
    required: true,
  },

  tags: {
    type: [String],
    default: [],
  },

  discountType: {
    type: String,
    enum: ["None", "Before Tax", "After Tax"],
    default: "None",
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  assignedBy: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  reference:{
    type: String,
    default: "N/A",
  },
  adminNote: {
    type: String,
    default: "N/A",
  },
  clientNote:{
    type: String,
    default: "N/A",
  },
  terms:{
    type: String,
    default: "N/A",
  },
  // items
  items: {
    type: [itemReference],
    default: [],
    required: true,
  },
  // Pricing
  discount: {
    totalDiscountType: {
      type: String,
      enum: ["Percentage", "Amount"],
      default: "Percentage",
    },
    value: {
      type: Number,
      default: 0,
    },
    adjustment: {
      type: Number,
      default: 0,
    },
  },
  subTotal: {
    type: Number,
    required: true,
  },

});

module.exports = mongoose.model("creditNote", creditNoteSchema);
