/* Profiles */

GRANT SELECT, INSERT, UPDATE, DELETE
ON profiles
TO authenticated;


/* Classrooms */

GRANT SELECT, INSERT, UPDATE, DELETE
ON classrooms
TO authenticated;


/* Students */

GRANT SELECT, INSERT, UPDATE, DELETE
ON students
TO authenticated;


/* Activities */

GRANT SELECT
ON activities
TO anon;

GRANT SELECT, INSERT, UPDATE, DELETE
ON activities
TO authenticated;


/* Submissions */

GRANT SELECT, INSERT, UPDATE
ON submissions
TO anon;

GRANT SELECT, INSERT, UPDATE, DELETE
ON submissions
TO authenticated;


/* Lesson plans */

GRANT SELECT, INSERT, UPDATE, DELETE
ON lesson_plans
TO authenticated;