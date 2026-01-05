import pool from '../db/index.js';

//creating new post
export const createPost = async (req, res) => {
  const { title, content } = req.body;
  //userId from middleware
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      `INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *`,
      [userId, title, content]
    );
    res.status(201).json({ post: result.rows[0] });
  } catch (err) {
    console.log('Error creating post: ', err);
    res.status(500).json({ msg: `Error creating post: ${err}` });
  }
};

//fetching all the posts
export const getPosts = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT posts.post_id, posts.title, posts.content, posts.created_at, users.username
      FROM posts 
      INNER JOIN users ON posts.user_id = users.user_id 
      ORDER BY posts.created_at DESC`
    );
    res.json({ posts: result.rows });
  } catch (err) {
    console.log(`Error fetching post, err: ${err}`);
    res.status(500).json({ success: false, msg: "can't get all the post" });
  }
};

//get posts of logged in user
export const getPostsMe = async (req, res) => {
  // from middleware
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      `SELECT posts.post_id, posts.title, posts.content, posts.created_at, users.username
      FROM posts 
      INNER JOIN users ON posts.user_id = users.user_id 
      WHERE posts.user_id = $1
      ORDER BY posts.created_at DESC`,
      [userId]
    );
    res.status(200).json({ success: true, posts: result.rows });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "can't get you posts, internal server error",
    });
  }
};

//fetcing post with ID
export const getPostWithId = async (req, res) => {
  const { id } = req.params;
  //debugging (id is still undefined)
  console.log(id);
  console.log(req.params);
  console.log(req.body);

  try {
    const result = await pool.query(
      `SELECT posts.id, posts.title, posts.content, posts.created_at, users.username
        FROM posts
        INNER JOIN users ON posts.user_id = users.id
        WHERE posts.id = $1;`,
      [id]
    );
    res.json({ post: result.rows[0] });
  } catch (err) {
    console.log(`Error message: ${err}`);
    res.status(404).json({
      success: false,
      msg: "There's no post with this ID",
      err: err.msg,
    });
  }
};

//updating post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  //from middleware
  const userId = req.user.userId;

  //fetch the post which is requested for update.
  try {
    const postUpdate = await pool.query(`SELECT * FROM posts WHERE id=$1`, [
      id,
    ]);
    if (postUpdate.rowCount === 0) {
      return res.status(404).json({ success: false, msg: 'page is not found' });
    }
    const post = postUpdate.rows[0];

    //Authorization check
    if (post.user_id !== userId) {
      return res
        .status(403)
        .json({ success: false, msg: "You can't update this post" });
    }

    const result = await pool.query(
      `UPDATE posts
        SET title = $1, content = $2, updated_at = NOW()
        WHERE id = $3
        RETURNING *;`,
      [title, content, id]
    );
    res.status(200).json({ post: result.rows[0] });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, msg: 'Error updating post', err: err.message });
  }
};

//deleting post
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId; //userId of logined user

  try {
    //fetch the requested post
    const resultPost = await pool.query(`SELECT * FROM posts WHERE id=$1`, [
      id,
    ]);

    if (resultPost.rowCount === 0) {
      return res.status(404).json({ success: false, msg: 'page is not found' });
    }
    //actual post from result obj
    const post = resultPost.rows[0];

    //check authorization
    if (post.user_id !== userId) {
      return res
        .status(403)
        .json({ success: false, msg: "You can't delete this post" });
    }
    const result = await pool.query(
      `DELETE FROM posts WHERE id=$1 RETURNING *`,
      [id]
    );
    res.status(200).json({
      success: true,
      msg: `post with id ${id} is deleted`,
      post: result.rows[0],
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, msg: 'Error deleting post', err: err.message });
  }
};
