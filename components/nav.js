import '@/app/globals.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Nav(){
    const router = useRouter();
    const Sair = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }
    return(
        <div className="flex flex-col bg-primary w-64 h-screen gap-4">
            <Link href='/'>Home</Link>
            <Link href='/nova-categoria'>Nova Categoria</Link>
            <Link href='/produtos'>Produtos</Link>
            <Link href='/promocoes'>Promocoes</Link>
            <button onClick={Sair}>Sair</button>
        </div> 
    )
}