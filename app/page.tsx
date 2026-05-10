import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='flex flex-col mt-[25vh] h-screen w-full'>

      {/*Menu temporário*/}
      <menu className="flex flex-col justify-center items-center py-10">
          <p className="text-8xl font-black">Atenas</p>
          <p className="text-4xl">Plataforma acadêmica</p>
          <p className="text-base p-5">Página inicial pública temporária da plataforma</p>
      </menu>

      {/*Navegação temporária*/}
      <div className='flex justify-center gap-5'>
        <Button href='/login' variant='primary'>Login</Button>
        <Button href='/atividade/default' variant='secondary'>Público</Button>
      </div>

    </div>
  );
}
