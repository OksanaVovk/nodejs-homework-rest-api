const express = require("express");
const { validation, ctrlWrapper, auth } = require("../../middlewares");
const { contactSchema, favoriteContactSchema } = require("../../models");
const { contacts: ctrl } = require("../../controllers");
const router = express.Router();
const validateMiddlwareAdd = validation(
  contactSchema,
  "missing required name field"
);
const validateMiddlwarePatch = validation(
  favoriteContactSchema,
  "missing field favorite"
);
const validateMiddlwareUpdate = validation(contactSchema, "missing field");

router.get("/", auth, ctrlWrapper(ctrl.getAll));
router.get("/:contactId", auth, ctrlWrapper(ctrl.getById));
router.post("/", auth, validateMiddlwareAdd, ctrlWrapper(ctrl.add));
router.delete("/:contactId", auth, ctrlWrapper(ctrl.removeById));
router.put(
  "/:contactId",
  auth,
  validateMiddlwareUpdate,
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:contactId/favorite",
  auth,
  validateMiddlwarePatch,
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
