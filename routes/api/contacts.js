const express = require("express");
const { validation, ctrlWrapper } = require("../../middlewares");
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

router.get("/", ctrlWrapper(ctrl.getAll));
router.get("/:contactId", ctrlWrapper(ctrl.getById));
router.post("/", validateMiddlwareAdd, ctrlWrapper(ctrl.add));
router.delete("/:contactId", ctrlWrapper(ctrl.removeById));
router.put(
  "/:contactId",
  validateMiddlwareUpdate,
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:contactId/favorite",
  validateMiddlwarePatch,
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
