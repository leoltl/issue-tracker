DROP TABLE IF EXISTS issues CASCADE;
DROP TYPE IF EXISTS user_role;

CREATE TYPE issue_status AS ENUM('open', 'closed');
CREATE TYPE issue_priority AS ENUM('low', 'medium', 'high', 'severe');

CREATE TABLE issues (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  project_id INT REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  author_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  assigned_to INT REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  issues_uuid uuid DEFAULT gen_random_uuid(),
  issue_status issue_status NOT NULL DEFAULT 'open',
  issue_priority issue_priority
);

INSERT INTO issues (title, description, project_id, assigned_to, author_id) VALUES ('my first issue', 'first issue recorded', 1, 2, 3);
INSERT INTO issues (title, description, project_id, assigned_to, author_id) VALUES ('my first issue', 'PM first issue recorded', 1, 2, 2);
INSERT INTO issues (title, description, project_id, assigned_to, author_id) VALUES ('my first issue', 'ADMIN first issue recorded', 1, 2, 1);


INSERT INTO issues (title, description, project_id, assigned_to, author_id) VALUES ('my first issue', 'first issue recorded', 2, 2, 3);
INSERT INTO issues (title, description, project_id, assigned_to, author_id) VALUES ('my first issue', 'PM first issue recorded', 2, 2, 2);
INSERT INTO issues (title, description, project_id, assigned_to, author_id) VALUES ('my first issue', 'ADMIN first issue recorded', 2, 2, 1);