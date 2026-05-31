ALTER TABLE submissions
DROP CONSTRAINT submissions_status_check;

ALTER TABLE submissions
ADD CONSTRAINT submissions_status_check
CHECK (
  status IN (
    'Pendente',
    'Entregue',
    'Entregue com atraso',
    'Corrigida'
  )
);