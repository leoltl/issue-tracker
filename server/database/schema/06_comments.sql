DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE comments (
  id            SERIAL          PRIMARY KEY NOT NULL,
  body          TEXT            NULL,
  comments_uuid uuid            DEFAULT gen_random_uuid(),
  issue_id      INT             REFERENCES issues(id) ON DELETE CASCADE NOT NULL,
  author_id     INT             REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  created_at    TIMESTAMP       DEFAULT NOW()
);