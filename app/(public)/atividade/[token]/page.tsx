export default function Atividade({ params }: { params: { token: string } }) {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <p>O token acessado é: {params.token}</p>
    </div>
  );
}
