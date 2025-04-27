const express = require('express');
const {handlegenerateShortUrl, handleRedirect}=require('../controllers/url')

const router = express.Router();

router.post('/',handlegenerateShortUrl)
router.get('/:shortId', handleRedirect)

module.exports = router;