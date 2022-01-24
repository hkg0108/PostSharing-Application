const Post = require('../models/post');

exports.createPost = (req , res , next ) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title:req.body.title,
    content : req.body.content,
    imagePath : url + "/images/" + req.file.filename,
    creator : req.userData.userId
  });
  post.save().then(createdPost =>{
    res.status(201).json({
      message:'Post added succesfully!',
      post : {
        ...createdPost,
        id: createdPost._id,

      }
    });
  })
  .catch(error =>{
    res.status(500).json({
      message:"Post creation is Failed!!"
    });
  });

};

exports.updatePost = (req,res,next)=>{
  let imagePath = req.body.imagePath;
  if(req.file){
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id : req.body.id,
    title : req.body.title,
    content : req.body.content,
    imagePath : imagePath,
    creator : req.userData.userId
  });
  //  console.log(post);
  Post.updateOne({_id: req.params.id , creator : req.userData.userId} , post).then(result =>{
    if(result.n > 0){
      // console.log(result);
      res.status(200).json({message : " Data Updated Successfully!"});
    }else{
      res.status(401).json({message : "Not authorized!!"});
    }

  })
  .catch(error =>{
    res.status(500).json({message : "Couldn't update Post!!"});
  });
};

exports.DeletePost = (req, res, next)=>{
  //console.log(req.params.id);
  Post.deleteOne({_id : req.params.id ,creator : req.userData.userId }).then(result => {
      // console.log(result);
      if(result.n> 0){
        res.status(200).json({ message: "Post Deleted!" });
      }else{
        res.status(401).json({message : "Not authorized!!"});
      }
  })
  .catch(error =>{
    res.status(500).json({
      message : "Deleting post Failed!!"
    });
  });
};


exports.fetchPosts = (req , res , next ) => {
  const pagesize = +req.query.pagesize;
  const currentpage = +req.query.page;
  const postQuery = Post.find();
  let postfetched;
  if(pagesize && currentpage){
    postQuery
    .skip(pagesize * (currentpage -1))
    .limit(pagesize);
  }
  postQuery
  .then(documents => {
    postfetched = documents;
    return Post.countDocuments();
  })
  .then(count=>{
    res.status(200).json({
        message:'Post fetched successfully!',
        posts: postfetched,
        maxPosts : count
      });
    })
    .catch(error =>{
      res.status(500).json({
        message : "Fetching posts Failed!!"
      });
    });
  };

  exports.fetchPostByID = (req,res,next)=>{
    Post.findById(req.params.id).then(post => {
      if(post){
        res.status(200).json(post);
      }else{
        res.status(404).json({message: " Post Not Found!!"});
      }

    })
    .catch(error =>{
      res.status(500).json({
        message : "Fetching post Failed!!"
      });
    });
    };
