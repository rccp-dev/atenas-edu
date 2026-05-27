CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    activity_id UUID REFERENCES activities(id),
    student_id UUID REFERENCES students(id),
    classroom_id UUID REFERENCES classrooms(id),

    file_url TEXT,
    grade NUMERIC(4,2)
    CHECK (grade BETWEEN 0 AND 10),
    feedback TEXT,
    
    status TEXT NOT NULL DEFAULT 'Pendente'
    CHECK (
        status IN (
            'Pendente',
            'Entregue',
            'Entregue com atraso'
            'Corrigida'
        )
    ),

    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP,
    is_draft BOOL NOT NULL DEFAULT TRUE
);

CREATE UNIQUE INDEX unique_submission_student_activity ON submissions(activity_id, student_id);
CREATE INDEX index_submissions_activity ON submissions(activity_id);
CREATE INDEX index_submissions_student ON submissions(student_id);
CREATE INDEX index_submissions_classroom ON submissions(classroom_id);