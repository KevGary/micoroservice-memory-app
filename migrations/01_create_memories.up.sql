DROP TABLE IF EXISTS memories;

CREATE TABLE memories (
  id serial primary key,
  old_days varchar(120),
  these_days varchar(120),
  year int
);