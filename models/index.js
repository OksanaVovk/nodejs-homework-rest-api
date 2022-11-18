const { contactSchema } = require("./contacts");
const { Contact } = require("./contacts");
const { favoriteContactSchema } = require("./contacts");
const { User } = require("./user");
const { userSchema } = require("./user");
const { userStatusSchema } = require("./user");
const { verifyEmailSchema } = require("./user");

module.exports = {
  contactSchema,
  favoriteContactSchema,
  Contact,
  User,
  userSchema,
  userStatusSchema,
  verifyEmailSchema,
};
