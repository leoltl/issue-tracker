DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS user_role;
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE user_role AS ENUM('admin', 'pm', 'dev', 'tester');

CREATE TABLE users (
  id        SERIAL PRIMARY KEY NOT NULL,
  name      VARCHAR(255) NOT NULL,
  username  VARCHAR(255) UNIQUE NOT NULL,
  password  VARCHAR(255) NOT NULL,
  email     VARCHAR(355) UNIQUE NOT NULL,
  role      user_role NOT NULL,
  users_uuid uuid DEFAULT gen_random_uuid()
);

DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE projects (
  id    SERIAL PRIMARY KEY NOT NULL,
  name  VARCHAR(255) NOT NULL,
  projects_uuid uuid DEFAULT gen_random_uuid()
);

DROP TABLE IF EXISTS project_members CASCADE;

CREATE TABLE project_members (
  project_id  INT REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  user_id     INT REFERENCES users(id) ON DELETE CASCADE NOT NULL
);
DROP TABLE IF EXISTS issues CASCADE;

DROP TYPE IF EXISTS issue_status;
DROP TYPE IF EXISTS issue_priority;

CREATE TYPE issue_status AS ENUM('open', 'closed');
CREATE TYPE issue_priority AS ENUM('low', 'medium', 'high', 'severe');

CREATE TABLE issues (
  id           SERIAL          PRIMARY KEY NOT NULL,
  title        VARCHAR(255)    NOT NULL,
  description  TEXT            NULL,
  project_id   INT             REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  author_id    INT             REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  assigned_id  INT             REFERENCES users(id) ON DELETE SET NULL,
  created_at   TIMESTAMP       DEFAULT NOW(),
  issues_uuid  uuid            DEFAULT gen_random_uuid(),
  status       issue_status    NOT NULL DEFAULT 'open',
  priority     issue_priority  NULL,
  updated_by   INT             REFERENCES users(id) ON DELETE SET NULL,
  updated_at   TIMESTAMP       DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION change_trigger() RETURNS trigger AS $$
  BEGIN
    IF    TG_OP = 'INSERT'
    THEN
      NEW.updated_at = NOW();
      INSERT INTO history (table_name, operation, new_val, record_uuid)
             VALUES (TG_RELNAME, TG_OP, row_to_json(NEW),  NEW.issues_uuid);
      RETURN NEW;
      
    ELSIF TG_OP = 'UPDATE'
    THEN
      NEW.updated_at = NOW();
      INSERT INTO history (table_name, operation, new_val, old_val, record_uuid)
             VALUES (TG_RELNAME, TG_OP,
                     row_to_json(NEW), row_to_json(OLD), OLD.issues_uuid);
      RETURN NEW;

    ELSIF TG_OP = 'DELETE'
    THEN
      INSERT INTO history (table_name, operation, old_val)
             VALUES (TG_RELNAME, TG_OP, row_to_json(OLD));
      RETURN OLD;

    END IF;
  END;
$$ LANGUAGE 'plpgsql' SECURITY DEFINER;

CREATE TRIGGER t BEFORE INSERT OR UPDATE OR DELETE ON issues
 
        FOR EACH ROW EXECUTE PROCEDURE change_trigger();

-- CREATE VIEW detail_view AS
--   SELECT i.title,
--          i.description,
--          i.created_at,
--          i.issues_uuid,
--          i.status,
--          i.priority,
--          uAutr.name AS author_name
--          Asnd.name AS assigned_name
--          p.name AS project_name
--   FROM issues as i
--   LEFT JOIN projects p ON i.project_id = p.id
--   LEFT JOIN users uAutr ON i.author_id = Autr.id
--   LEFT JOIN users uAsnd ON i.assigned_id = uAsnd.id;
DROP TABLE IF EXISTS history CASCADE;

CREATE TABLE history (
  id           SERIAL,
  history_uuid uuid DEFAULT gen_random_uuid(),
  timestamp    TIMESTAMP DEFAULT NOW(),
  table_name   TEXT,
  operation    TEXT,
  who          TEXT DEFAULT current_user,
  new_val      json,
  old_val      json,
  record_uuid  uuid
)
DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE comments (
  id            SERIAL          PRIMARY KEY NOT NULL,
  body          TEXT            NULL,
  comments_uuid uuid            DEFAULT gen_random_uuid(),
  issue_id      INT             REFERENCES issues(id) ON DELETE CASCADE NOT NULL,
  author_id     INT             REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  created_at    TIMESTAMP       DEFAULT NOW()
);

INSERT INTO users (name, username, password, email, role) VALUES ('name_Admin', 'u_Admin', '$2b$10$b0xs1mINicg6fjT0TfFbTuP1VK2ZGp8lroybyrhmLd1Y.p3j3ZCuu', 'admin@email.com', 'admin');
INSERT INTO users (name, username, password, email, role) VALUES ('name_PM', 'u_PM', '$2b$10$b0xs1mINicg6fjT0TfFbTuP1VK2ZGp8lroybyrhmLd1Y.p3j3ZCuu', 'pm@email.com', 'pm');
INSERT INTO users (name, username, password, email, role) VALUES ('name_Dev', 'u_Dev', '$2b$10$b0xs1mINicg6fjT0TfFbTuP1VK2ZGp8lroybyrhmLd1Y.p3j3ZCuu', 'dev@email.com', 'dev');
INSERT INTO users (name, username, password, email, role) VALUES ('name_Tester', 'u_Tester', '$2b$10$b0xs1mINicg6fjT0TfFbTuP1VK2ZGp8lroybyrhmLd1Y.p3j3ZCuu', 'tester@email.com', 'tester');
INSERT INTO users (name, username, password, email, role) VALUES ('name_PM2', 'u_PM2', '$2b$10$b0xs1mINicg6fjT0TfFbTuP1VK2ZGp8lroybyrhmLd1Y.p3j3ZCuu', 'pm2@email.com', 'pm');
INSERT INTO users (name, username, password, email, role) VALUES ('name_Dev2', 'u_Dev2', '$2b$10$b0xs1mINicg6fjT0TfFbTuP1VK2ZGp8lroybyrhmLd1Y.p3j3ZCuu', 'dev2@email.com', 'dev');
INSERT INTO users (name, username, password, email, role) VALUES ('name_Tester2', 'u_Tester2', '$2b$10$b0xs1mINicg6fjT0TfFbTuP1VK2ZGp8lroybyrhmLd1Y.p3j3ZCuu', 'tester2@email.com', 'tester');

INSERT INTO projects (name) VALUES ('test project');
INSERT INTO projects (name) VALUES ('project Vue');


INSERT into project_members (project_id, user_id) VALUES (1, 1);  
INSERT into project_members (project_id, user_id) VALUES (2, 1);
INSERT into project_members (project_id, user_id) VALUES (1, 2);
INSERT into project_members (project_id, user_id) VALUES (1, 3); 
INSERT into project_members (project_id, user_id) VALUES (1, 4);
INSERT into project_members (project_id, user_id) VALUES (2, 5);
INSERT into project_members (project_id, user_id) VALUES (2, 6); 
INSERT into project_members (project_id, user_id) VALUES (2, 7); 


INSERT INTO issues (title, description, project_id, assigned_id, author_id, updated_by) VALUES ('Admin Project 1 first', 'Admin Project 1 first issue recorded', 1, 2, 1, 1);
INSERT INTO issues (title, description, project_id, assigned_id, author_id, updated_by) VALUES ('Admin Project 2 first', 'Admin Project 2 first issue recorded', 2, 5, 1, 1);
INSERT INTO issues (title, description, project_id, assigned_id, author_id, updated_by) VALUES ('PM1 first issue', 'PM1 first issue recorded', 1, 3, 2, 2);
INSERT INTO issues (title, description, project_id, assigned_id, author_id, updated_by) VALUES ('PM2 first issue', 'PM2 first issue recorded', 2, 6, 5, 5);
INSERT INTO issues (title, description, project_id, assigned_id, author_id, updated_by) VALUES ('Dev1 first issue', 'Dev1 first issue recorded', 1, 3, 3, 3);
INSERT INTO issues (title, description, project_id, assigned_id, author_id, updated_by) VALUES ('Dev2 first issue', 'Dev2 first issue recorded', 2, 6, 6, 6);
INSERT INTO issues (title, description, project_id, assigned_id, author_id, updated_by) VALUES ('Tester1 first issue', 'Tester1 first issue recorded', 1, 2, 4, 4);
INSERT INTO issues (title, description, project_id, assigned_id, author_id, updated_by) VALUES ('Tester2 first issue', 'Tester2 first issue recorded', 2, 5, 7, 7);

INSERT INTO comments (body, issue_id, author_id) VALUES ('comment 1 from user 1', 1, 1);
INSERT INTO comments (body, issue_id, author_id) VALUES ('comment 1 from user 2', 1, 2);
INSERT INTO comments (body, issue_id, author_id) VALUES ('comment 2 from user 1', 1, 1);
INSERT INTO comments (body, issue_id, author_id) VALUES ('comment 2 from user 2', 1, 2);
INSERT INTO comments (body, issue_id, author_id) VALUES ('comment 1 from user 1', 2, 1);
INSERT INTO comments (body, issue_id, author_id) VALUES ('comment 1 from user 2', 2, 2);
INSERT INTO comments (body, issue_id, author_id) VALUES ('comment 2 from user 1', 2, 1);
INSERT INTO comments (body, issue_id, author_id) VALUES ('comment 2 from user 2', 2, 2);