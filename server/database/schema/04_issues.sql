DROP TABLE IF EXISTS issues;

CREATE TABLE issues (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  author_id INT REFERENCES users(id),
  created_at TIMESTAMP
);