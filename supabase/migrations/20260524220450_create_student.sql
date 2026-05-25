CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    classroom_id UUID REFERENCES classrooms(id),

    name TEXT,
    enrollment TEXT,
    content TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP,
    is_draft BOOL NOT NULL DEFAULT TRUE
);

CREATE INDEX index_students_classroom ON students(classroom_id);