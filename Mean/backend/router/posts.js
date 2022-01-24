const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/multerfile");
const PostController  = require("../controller/posts");


router.post("",checkAuth,extractFile,PostController.createPost);

router.get('',PostController.fetchPosts);

router.get('/:id',PostController.fetchPostByID);

router.put("/:id",checkAuth,extractFile,PostController.updatePost );

router.delete("/:id", checkAuth, PostController.DeletePost);

module.exports = router;
