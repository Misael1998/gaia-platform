const express = require("express");
const router = express.Router();

const {
  registerEnterpriseUser,
  registerIndividualClient
} = require("../controllers/user");

router.route("/registerenterpriseuser").post(registerEnterpriseUser);
router.route("/registerindivualclient").post(registerIndividualClient);

module.exports = router;
