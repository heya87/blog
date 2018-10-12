const express = require('express');
const multer = require('multer');

const Post = require('../models/post');
const router = express.Router();
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    //path relative to server.js
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLocaleLowerCase()
      .split(' ')
      .join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + Date.now() + '.' + ext);
  }
});

router.post(
  '',
  multer({ storage: storage }).single('image'),
  (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + '/images/' + req.file.filename
    });
    post.save().then(createdPost => {
      res.status(201).json({
        message: 'Post added succesfully!',
        post: {
          id: createdPost._id,
          title: createdPost.title,
          content: createdPost.content,
          imagePath: createdPost.imagePath
        }
      });
    });
  }
);

router.put(
  '/:postId',
  multer({ storage: storage }).single('image'),
  (req, res, next) => {
    console.log(req.body);
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      imagePath = url + '/images/' + req.file.filename;
    }
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath
    });
    Post.updateOne({ _id: req.params.postId }, post).then(result => {
      res.status(200).json({ message: 'Post updated succesfully!' });
    });
  }
);

router.get('', (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.currentpage;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: 'Post data fetched succesfully!',
        posts: fetchedPosts,
        maxPosts: count
      });
    });
});

router.get('/:postId', (req, res, next) => {
  const post = Post.findById(req.params.postId).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(400).json({
        message: 'Post not found.'
      });
    }
  });
});

router.delete('/:postId', (req, res, next) => {
  Post.deleteOne({ _id: req.params.postId }).then(result => {});
  res.status(200).json({ message: 'Post deleted' });
});

module.exports = router;
