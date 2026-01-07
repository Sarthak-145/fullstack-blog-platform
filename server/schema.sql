-- Schema v1
-- Explicit named constraints for easier debugging
-- Created during first production deployment (Render)


CREATE TABLE users (
  user_id SERIAL,

  username VARCHAR(50),
  email VARCHAR(255),
  password_hash TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT users_pkey PRIMARY KEY (user_id),

  CONSTRAINT users_username_not_null CHECK (username IS NOT NULL),
  CONSTRAINT users_email_not_null CHECK (email IS NOT NULL),
  CONSTRAINT users_password_hash_not_null CHECK (password_hash IS NOT NULL),

  CONSTRAINT users_username_unique UNIQUE (username),
  CONSTRAINT users_email_unique UNIQUE (email)
);


CREATE TABLE posts (
  post_id SERIAL,

  title VARCHAR(255),
  content TEXT,
  user_id INTEGER,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT posts_pkey PRIMARY KEY (post_id),

  CONSTRAINT posts_title_not_null CHECK (title IS NOT NULL),
  CONSTRAINT posts_content_not_null CHECK (content IS NOT NULL),
  CONSTRAINT posts_user_id_not_null CHECK (user_id IS NOT NULL),

  CONSTRAINT posts_user_fk
    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE
);


--runs queries faster
CREATE INDEX posts_user_id_idx ON posts(user_id);

