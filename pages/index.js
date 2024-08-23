import '@/app/globals.css';
import Nav from "@/components/nav";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from 'react';

export default function Home(){
    useAuth();
    const [nome, setNome] = useState('');

    useEffect(() => {
        const nomeStorage = localStorage.getItem('nome');
        if(nomeStorage){
            setNome(nomeStorage);
        }
    },[])
    return(
        <div className="flex">
          <Nav/>
            <p>Bem vindo {nome}</p>
        </div>
    )
}
