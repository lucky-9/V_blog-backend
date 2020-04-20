const Blog = require("../models/blog");
const { check, validationResult } = require('express-validator');


exports.getBlogById = (req, res, next, id) => {
    Blog.findById(id)
    .populate({path:"author", select:'username email'})
      .exec((err, blog) => {
        if (err) {
          return res.status(400).json({
            "error": "Blog not found"
          });
        }
        req.blog = blog;
        next();
      });
  };


  exports.createBlog = (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error:errors.array()[0].msg
        })
    }
    const blog = new Blog(req.body);
    blog.save((err, blog) =>{ 
        if(err){
            return res.status(400).json({
                "error":"error saving blog"
            })
        }
        res.json({
            title:blog.title,
            description:blog.description,
            likes:blog.likes
        })
     });  

  }




  exports.getBlog = (req, res) =>{
    return res.json(req.blog);
}



exports.getBlogs = (req, res) =>{
  let limit = req.query.limit?parseInt(req.query.limit):100
  let sortBy = req.query.sortBy?req.query.sortBy:"_id";
  Blog.find()
   .limit(limit)
    .sort("-_id")
  .populate({path:"author", select:'username email'})
  .exec((err, blogs) =>{
      if(err){
          return res.status(400).json({
              "error":"blogs not found"
          })
      }
      return res.json(blogs);
  })
}


exports.updateBlog = (req, res) =>{
  
          let blog =  req.blog;
          //console.log(blog);
          blog.save((err, blog) =>{
              if(err){
                  return res.status(400).json({
                      "error":"updation of blog failed in DB"
                  })
              }
              res.json(blog);
          })
      
  
}

exports.incrementBlogLikeCount = (req, res) =>{
    let blog= req.blog;
    let user = req.profile;
    let userLikedBlogs = user.likedBlogs;
    console.log("before pushing ", userLikedBlogs);
    let blogIsLiked = userLikedBlogs.includes(blog._id);
    if(blogIsLiked){
      return  res.send("Blog is alreaady liked");
    }

    console.log(user);
    blog.likes = blog.likes+1;
    user.likedBlogs.push(blog._id);
    user.save();
    console.log("after pushing ", userLikedBlogs);
    blog.save((err, blog) =>{
        if(err){
            return res.status(400).json({
                "error":"updation of Blog Like Count failed in DB"
            })
        }
        res.json(blog);
    })   
}

exports.removeBlog = (req, res) =>{
  const blog = req.blog;

  blog.remove((err, blog) =>{
      if(err){
          return res.status(400).json({
              "error":"failed to delete blog"
          })
      }
      res.json({
          message:`${blog.title} succesfully deleted`
      });
  })
}