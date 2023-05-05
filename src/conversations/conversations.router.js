const router = require('express').Router();
const conversationServices = require('./conversations.services')

const passportJwt = require('../middlewares/auth.middleware');

router.route("/")
    .post(
        passportJwt.authenticate('jwt', { session: false}),
        conversationServices.postNewConversation
    );

module.exports = router