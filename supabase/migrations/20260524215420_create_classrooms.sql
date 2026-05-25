CREATE TABLE classrooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    year SMALLINT NOT NULL
    CHECK (year BETWEEN 1 AND 9),

    grade CHAR(1) NOT NULL
    CHECK (grade BETWEEN 'A' AND 'Z'),

    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP,
    is_draft BOOL NOT NULL DEFAULT TRUE
);