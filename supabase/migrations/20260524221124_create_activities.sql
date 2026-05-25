CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    classroom_id UUID REFERENCES classrooms(id),
    token UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),

    title TEXT,
    description TEXT,
    deadline TIMESTAMPTZ,
    attachments TEXT[],
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP,
    is_draft BOOL NOT NULL DEFAULT TRUE
);

CREATE INDEX index_activities_classroom ON activities(classroom_id);