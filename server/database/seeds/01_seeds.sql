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