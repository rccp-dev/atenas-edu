-- Users

insert into auth.users (
  id,
  aud,
  role,
  email,
  encrypted_password
)
values (
  'd49a08e2-0d06-4566-8496-c3d9d86ca223',
  'authenticated',
  'authenticated',
  'atenasedu.co@gmail.com',
  crypt('admin.atenas-edu.2026', gen_salt('bf'))
);

-- Profiles

INSERT INTO profiles (
    id,
    name,
    role
)
VALUES
(
    'd49a08e2-0d06-4566-8496-c3d9d86ca223',
    'admin-atenas-edu',
    'Administrador'
);

-- Classrooms

INSERT INTO classrooms (
    grade,
    section,
    description,
    is_draft
)
VALUES
(
    7,
    'A',
    'Turma focada em leitura e produção textual.',
    false
),
(
    8,
    'B',
    'Turma intermediária de gramática.',
    false
);

-- Students

INSERT INTO students (
    classroom_id,
    name,
    enrollment,
    content,
    is_draft
)
VALUES
(
    (SELECT id FROM classrooms WHERE grade = 7 AND section = 'A'),
    'Ana Clara',
    '2026001',
    'Boa interpretação textual.',
    false
),
(
    (SELECT id FROM classrooms WHERE grade = 7 AND section = 'A'),
    'Pedro Henrique',
    '2026002',
    'Precisa melhorar ortografia.',
    false
),
(
    (SELECT id FROM classrooms WHERE grade = 8 AND section = 'B'),
    'Julia Martins',
    '2026003',
    'Excelente escrita.',
    false
);

-- Activities

INSERT INTO activities (
    classroom_id,
    token,
    title,
    description,
    deadline,
    attachments,
    is_draft
)
VALUES
(
    (SELECT id FROM classrooms WHERE grade = 7 AND section = 'A'),
    gen_random_uuid(),
    'Redação sobre meio ambiente',
    'Escreva uma redação dissertativa sobre preservação ambiental.',
    now() + interval '7 days',
    ARRAY[
        'https://example.com/material1.pdf',
        'https://example.com/material2.pdf'
    ],
    false
),
(
    (SELECT id FROM classrooms WHERE grade = 8 AND section = 'B'),
    gen_random_uuid(),
    'Análise gramatical',
    'Realizar análise sintática das frases enviadas.',
    now() + interval '5 days',
    ARRAY[
        'https://example.com/gramatica.pdf'
    ],
    false
);

-- Submissions

INSERT INTO submissions (
    activity_id,
    student_id,
    classroom_id,
    file_url,
    grade,
    feedback,
    status,
    is_draft
)
VALUES
(
    (SELECT id FROM activities WHERE title = 'Redação sobre meio ambiente'),
    (SELECT id FROM students WHERE name = 'Ana Clara'),
    (SELECT id FROM classrooms WHERE grade = 7 AND section = 'A'),
    'https://example.com/envio-ana.pdf',
    NULL,
    NULL,
    'Entregue',
    false
),
(
    (SELECT id FROM activities WHERE title = 'Redação sobre meio ambiente'),
    (SELECT id FROM students WHERE name = 'Pedro Henrique'),
    (SELECT id FROM classrooms WHERE grade = 7 AND section = 'A'),
    'https://example.com/envio-pedro.pdf',
    7.50,
    'Boa estrutura, revise a pontuação.',
    'Corrigida',
    false
);

-- Lesson Plans

INSERT INTO lesson_plans (
    classroom_id,
    title,
    description,
    content,
    subjects,
    is_draft
)
VALUES
(
    (SELECT id FROM classrooms WHERE grade = 7 AND section = 'A'),
    'Plano de leitura argumentativa',
    'Introdução à redação argumentativa.',
    'Apresentar conceitos básicos de tese, argumento e conclusão.',
    ARRAY['Literatura', 'Redação'],
    false
),
(
    (SELECT id FROM classrooms WHERE grade = 8 AND section = 'B'),
    'Plano de gramática',
    'Estudo de análise sintática.',
    'Explicar sujeito, predicado e complementos.',
    ARRAY['Gramática'],
    false
);