const { Schema, model } = require("mongoose");
const Joi = require("joi");

const codeRegexp = /^[0-9]{9}$/;
//вимоги до об*єкта
const productSchema = Schema(
  {
    name: {
      type: String,
      require: true,
      // minlength: 2,
      // maxlength: 10,
    },
    price: {
      type: Number,
      required: [true, "price mmust be exist"],
      min: 0.01,
    },
    location: {
      type: String,
      required: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    //"basic"," sale", "stop"
    status: {
      type: String,
      enum: ["basic", " sale", "stock"],
      default: "basic",
    },
    //  caм по собі тне працює
    code: {
      type: String,
      required: true,
      unique: true,
      // регулярні вирази через
      match: codeRegexp,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0.01).required(),
  location: Joi.string().required(),
  active: Joi.bool(),
  status: Joi.string().valid("basic", "sale", "stock"),
  code: Joi.string().pattern(codeRegexp),
  favorite: Joi.boolean(),
});

const statusJoiSchema = Joi.object({
  status: Joi.string().valid("basic", " sale", "stock").required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Product = model("product", productSchema);

module.exports = {
  Product,
  joiSchema,
  statusJoiSchema,
  updateFavoriteSchema,
};

// enum: statusList, const statusList = ["basic", " sale", "stock"];

// "name": "Car 1",
// "price": "10",
// "location": "Car Center",
// "code": "987456321",
// "favorite": "true"
