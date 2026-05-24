CREATE TABLE lesson_plans(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    classroom_id UUID REFERENCES classrooms(id),

    title TEXT,
    description TEXT,
    content TEXT,

    subjects TEXT[] DEFAULT ARRAY['Vazio']
    CHECK (
        subjects <@ ARRAY[
            'Vazio',
            'Literatura',
            'Gramática',
            'Redação'
        ]
    ),

    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP,
    is_draft BOOL DEFAULT TRUE
);

CREATE INDEX index_plans_classroom ON lesson_plans(classroom_id);