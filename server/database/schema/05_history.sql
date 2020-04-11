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