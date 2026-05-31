CREATE TABLE profiles (
    id UUID PRIMARY KEY
    REFERENCES auth.users(id)
    ON DELETE CASCADE,

    name TEXT NOT NULL,

    role TEXT NOT NULL DEFAULT 'Convidado'
    CHECK (
        role IN (
            'Administrador',
            'Docente',
            'Convidado'
        )
    ),

    created_at TIMESTAMP DEFAULT now()
);