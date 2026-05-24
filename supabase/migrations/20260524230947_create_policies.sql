CREATE FUNCTION get_user_role()
RETURNS TEXT
LANGUAGE sql
STABLE
AS $$
    SELECT role
    FROM profiles
    WHERE id = auth.uid()
$$;

/* Profiles */
CREATE POLICY "Authenticated users can view profiles"
ON profiles
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins create profiles"
ON profiles
FOR INSERT
TO authenticated
WITH CHECK (
    get_user_role() = 'Administrador'
);

CREATE POLICY "Admins update profiles"
ON profiles
FOR UPDATE
TO authenticated
USING (
    get_user_role() = 'Administrador'
);

CREATE POLICY "Admins delete profiles"
ON profiles
FOR DELETE
TO authenticated
USING (
    get_user_role() = 'Administrador'
);

/* Classrooms */
CREATE POLICY "Authenticated users view classrooms"
ON classrooms
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Docentes create classrooms"
ON classrooms
FOR INSERT
TO authenticated
WITH CHECK (
    get_user_role() IN (
        'Administrador',
        'Docente'
    )
);

CREATE POLICY "Docentes update classrooms"
ON classrooms
FOR UPDATE
TO authenticated
USING (
    get_user_role() IN (
        'Administrador',
        'Docente'
    )
);

CREATE POLICY "Docentes delete classrooms"
ON classrooms
FOR DELETE
TO authenticated
USING (
    get_user_role() IN (
        'Administrador',
        'Docente'
    )
);

/* Students */
CREATE POLICY "Authenticated users view students"
ON students
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Docentes create students"
ON students
FOR INSERT
TO authenticated
WITH CHECK (
    get_user_role() IN (
        'Administrador',
        'Docente'
    )
);

CREATE POLICY "Docentes update students"
ON students
FOR UPDATE
TO authenticated
USING (
    get_user_role() IN (
        'Administrador',
        'Docente'
    )
);

CREATE POLICY "Docentes delete students"
ON students
FOR DELETE
TO authenticated
USING (
    get_user_role() IN (
        'Administrador',
        'Docente'
    )
);

/* Activities (public) */
CREATE POLICY "Public can view activities"
ON activities
FOR SELECT
USING (true);

/* Activities (protected) */
CREATE POLICY "Docentes create activities"
ON activities
FOR INSERT
TO authenticated
WITH CHECK (
    get_user_role() IN (
        'Administrador',
        'Docente'
    )
);

CREATE POLICY "Docentes update activities"
ON activities
FOR UPDATE
TO authenticated
USING (
    get_user_role() IN (
        'Administrador',
        'Docente'
    )
);

CREATE POLICY "Docentes delete activities"
ON activities
FOR DELETE
TO authenticated
USING (
    get_user_role() IN (
        'Administrador',
        'Docente'
    )
);

/* Submissions (public) */
CREATE POLICY "Public can view submissions"
ON submissions
FOR SELECT
USING (true);

CREATE POLICY "Public can create submissions"
ON submissions
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Public can update submissions"
ON submissions
FOR UPDATE
USING (true);

/* Submissions (protected) */
CREATE POLICY "Admins delete submissions"
ON submissions
FOR DELETE
TO authenticated
USING (
    get_user_role() = 'Administrador'
);

/* Lesson plans */
CREATE POLICY "Authenticated users view lesson plans"
ON lesson_plans
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Docentes create lesson plans"
ON lesson_plans
FOR INSERT
TO authenticated
WITH CHECK (
    get_user_role() IN (
        'Administrador',
        'Docente'
    )
);

CREATE POLICY "Docentes update lesson plans"
ON lesson_plans
FOR UPDATE
TO authenticated
USING (
    get_user_role() IN (
        'Administrador',
        'Docente'
    )
);

CREATE POLICY "Docentes delete lesson plans"
ON lesson_plans
FOR DELETE
TO authenticated
USING (
    get_user_role() IN (
        'Administrador',
        'Docente'
    )
);