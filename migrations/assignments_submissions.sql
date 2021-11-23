DROP TABLE IF EXISTS assignment_submissions;
DROP TABLE IF EXISTS assignments;

CREATE TABLE assignments (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT,
  content TEXT,
  day INTEGER,
  chapter INTEGER,
  duration INTEGER
);

CREATE TABLE assignment_submissions (
  id SERIAL PRIMARY KEY NOT NULL,
  assignment_id INTEGER REFERENCES assignments(id) ON DELETE CASCADE,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  duration INTEGER,
  submission_date DATE
);