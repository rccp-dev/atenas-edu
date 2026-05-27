ALTER TABLE activities
ADD COLUMN status TEXT NOT NULL
DEFAULT 'Atribuída'
CHECK (
    status IN (
        'Atribuída',
        'Corrigida'
    )
);