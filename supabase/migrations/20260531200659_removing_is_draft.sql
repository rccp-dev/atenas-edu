ALTER TABLE students
DROP column IF EXISTS is_draft;

ALTER TABLE activities
DROP column IF EXISTS is_draft;

ALTER TABLE lesson_plans
DROP column IF EXISTS is_draft;

ALTER TABLE classrooms
DROP column IF EXISTS is_draft;

ALTER TABLE submissions
DROP column IF EXISTS is_draft;