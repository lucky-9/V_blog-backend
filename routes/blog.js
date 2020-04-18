const { check } = require('express-validator');
const express = require("express");
const router = express.Router();




const {getBlogById, getBlog, getBlogs, removeBlog, createBlog, updateBlog, incrementBlogLikeCount} = require("../controller/blog");
const {isAuthenticated, isSignedin} = require('../controller/auth');
const {getUserById} = require('../controller/user');


router.param("userId", getUserById);
router.param("blogId", getBlogById);

//Read Routes
router.get("/blog/:blogId", getBlog);
router.get('/blogs', getBlogs);




//Post Routes
router.post("/create/:userId",[
    // ...some other validations...
  check("title").isLength({min:5}).withMessage("Title should be atleast 5 characters"),
  check("description").isLength({min:25}).withMessage("Description should be atleast 25 characters")
  ],isSignedin, isAuthenticated, createBlog);



  router.put("/blog/:blogId/:userId",isSignedin, isAuthenticated, updateBlog);
  router.put("/blog/:blogId/:userId/like",isSignedin, isAuthenticated, incrementBlogLikeCount);

  //Delete Routes
  router.delete('/blog/:blogId/:userId', isSignedin, isAuthenticated, removeBlog);



  module.exports = router;