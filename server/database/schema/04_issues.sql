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
      INSERT INTO history (table_name, operation, new_val)
             VALUES (TG_RELNAME, TG_OP, row_to_json(NEW));
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

CREATE TRIGGER t BEFORE UPDATE ON issues
 
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