DROP TABLE IF EXISTS project_members CASCADE;

CREATE TABLE project_members (
  project_id  INT REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  user_id     INT REFERENCES users(id) ON DELETE CASCADE NOT NULL
);


INSERT into project_members (project_id, user_id) VALUES (1, 1);  
INSERT into project_members (project_id, user_id) VALUES (2, 1);
  
INSERT into project_members (project_id, user_id) VALUES (1, 2);
INSERT into project_members (project_id, user_id) VALUES (1, 3); 
INSERT into project_members (project_id, user_id) VALUES (1, 4); 

INSERT into project_members (project_id, user_id) VALUES (2, 5);
INSERT into project_members (project_id, user_id) VALUES (2, 6); 
INSERT into project_members (project_id, user_id) VALUES (2, 7); 