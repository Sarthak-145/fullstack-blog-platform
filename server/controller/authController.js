import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db/index.js';

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

//signing up new user
export const register = async (req, res) => {
  const { email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING user_id, username, email, created_at, updated_at',
      [username, email, hashedPassword]
    );
    const user = result.rows[0];

    const token = jwt.sign({ userId: user.user_id }, jwtSecret, {
      expiresIn: '1d',
    });
    res.status(201).json({ success: true, token: token, user: user });
  } catch (err) {
    if (err.code === 23505) {
      return res
        .status(409)
        .json({ success: false, msg: 'Email or username already exists' });
    }
    res.status(500).json({ success: false, msg: 'Registration failed' });
  }
};

//login a user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT user_id, username, email, password_hash, created_at, updated_at FROM users WHERE email = $1',
      [email]
    );
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ success: false, msg: 'User not found' });
    }
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ success: false, msg: 'Invalid password!' });
    }

    const token = jwt.sign({ userId: user.user_id }, jwtSecret, {
      expiresIn: '1d',
    });
    delete user.password_hash;

    res.status(200).json({ success: true, token: token, user: user });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Error login user' });
  }
};

export const getMe = async (req, res) => {
  //from middleware
  const userId = req.user.userId;
  const result = await pool.query(
    'SELECT user_id, username, email, created_at, updated_at FROM users WHERE user_id = $1',
    [userId]
  );

  if (!result.rows[0]) {
    return res.status(404).json({ success: false, msg: 'User is not found' });
  }

  res.status(200).json({ success: true, user: result.rows[0] });
};
