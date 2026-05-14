import { supabase } from '@/lib/supabase'

export default async function TestePage() {

  const { data, error } = await supabase
    .from('turmas')
    .select('*')

  return (
    <div style={{ padding: '40px' }}>
      <h1>Teste Supabase</h1>

      <h2>Dados:</h2>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>

      <h2>Erro:</h2>

      <pre>
        {JSON.stringify(error, null, 2)}
      </pre>
    </div>
  )
}