const express = require('express');
const router = express.Router();

// const app = express();

const {
  registerEnterpriseUser
} = require('../controllers/user')

router.route('/registerenterpriseuser').post(registerEnterpriseUser);


module.exports = router
