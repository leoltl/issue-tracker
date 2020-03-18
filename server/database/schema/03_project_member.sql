DROP TABLE IF EXISTS project_members CASCADE;

CREATE TABLE project_members (
  project_id  INT REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  user_id     INT REFERENCES users(id) ON DELETE CASCADE NOT NULL
);

INSERT into project_members (project_id, user_id) VALUES (1, 1);  
INSERT into project_members (project_id, user_id) VALUES (1, 2);
INSERT into project_members (project_id, user_id) VALUES (1, 3); 