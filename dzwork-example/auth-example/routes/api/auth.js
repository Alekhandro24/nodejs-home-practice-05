const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const {
  joiRegisterSchema,
  joiLoginSchema,
  updateSubscriptionSchema,
} = require("../../models/user");

const router = express.Router();

// router.post("/signup");
router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);
//router.post("/signup")

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
//router.post("/signin")

router.get("/logout", auth, ctrlWrapper(ctrl.logout));
//router.get("/signout")

router.patch(
  "/",
  auth,
  validation(updateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
