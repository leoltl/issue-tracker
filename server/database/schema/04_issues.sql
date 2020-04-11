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
  assigned_id INT REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  issues_uuid uuid DEFAULT gen_random_uuid(),
  status issue_status NOT NULL DEFAULT 'open',
  priority issue_priority
);

INSERT INTO issues (title, description, project_id, assigned_id, author_id) VALUES ('Admin Project 1 first', 'Admin Project 1 first issue recorded', 1, 2, 1);
INSERT INTO issues (title, description, project_id, assigned_id, author_id) VALUES ('Admin Project 2 first', 'Admin Project 2 first issue recorded', 2, 5, 1);

INSERT INTO issues (title, description, project_id, assigned_id, author_id) VALUES ('PM1 first issue', 'PM1 first issue recorded', 1, 3, 2);
INSERT INTO issues (title, description, project_id, assigned_id, author_id) VALUES ('PM2 first issue', 'PM2 first issue recorded', 2, 6, 5);

INSERT INTO issues (title, description, project_id, assigned_id, author_id) VALUES ('Dev1 first issue', 'Dev1 first issue recorded', 1, 3, 3);
INSERT INTO issues (title, description, project_id, assigned_id, author_id) VALUES ('Dev2 first issue', 'Dev2 first issue recorded', 2, 6, 6);

INSERT INTO issues (title, description, project_id, assigned_id, author_id) VALUES ('Tester1 first issue', 'Tester1 first issue recorded', 1, 2, 4);
INSERT INTO issues (title, description, project_id, assigned_id, author_id) VALUES ('Tester2 first issue', 'Tester2 first issue recorded', 2, 5, 7);