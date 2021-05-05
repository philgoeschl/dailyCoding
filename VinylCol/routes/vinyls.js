const express = require('express');
let router = express.Router();
const vinyls = require('../controllers/vinyls');

// router.get('/', vinyls.vinyls);

// middleware
router.use((req, res, next) => {
    console.log('### vinyl router middleware');
    next();
});

router.route('/')
.get(vinyls.vinyls);

module.exports = router;