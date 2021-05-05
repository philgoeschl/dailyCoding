const express = require('express');
let router = express.Router();
hello = require('../controllers/hello');

router.use((req,res,next) => {
    console.log('### hello router middleware');
    next();
})

router.get('/', hello.hello);

module.exports = router;