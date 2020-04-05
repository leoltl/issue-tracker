DROP TABLE IF EXISTS issues CASCADE;

CREATE TABLE issues (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  project_id INT REFERENCES projects(id) ON DELETE CASCADE,
  author_id INT REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  issues_uuid uuid DEFAULT gen_random_uuid()
);

INSERT INTO issues (title, description, project_id, author_id) VALUES ('my first issue', 'first issue recorded', 1, 3);
INSERT INTO issues (title, description, project_id, author_id) VALUES ('my first issue', 'PM first issue recorded', 1, 2);
INSERT INTO issues (title, description, project_id, author_id) VALUES ('my first issue', 'ADMIN first issue recorded', 1, 1);


INSERT INTO issues (title, description, project_id, author_id) VALUES ('my first issue', 'first issue recorded', 2, 3);
INSERT INTO issues (title, description, project_id, author_id) VALUES ('my first issue', 'PM first issue recorded', 2, 2);
INSERT INTO issues (title, description, project_id, author_id) VALUES ('my first issue', 'ADMIN first issue recorded', 2, 1);