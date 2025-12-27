const express = require('express');
const router = express.Router();

const { handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleCreateUser,
    handleDeleteUserById,
    handleRenderAllUserHtml,

} = require('../controller/user.js');

router.get('/users', handleGetAllUsers);

router.route('/')
    .get(handleRenderAllUserHtml)
    .post(handleCreateUser)

router.route('/:id')
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)


module.exports = router;