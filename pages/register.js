import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import '@/app/globals.css';

export default function Register(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const router = useRouter();

    const fetchData = async(event) => {
        event.preventDefault();
        try{
            const response = await axios.post('/api/register', {nome, email, senha});
            alert(response.data.message);
            router.push('/login');
        }catch(error){
            alert(error.response.data.message);
        }
    }

    return(
        <div>
            <form onSubmit={fetchData}>
                <label>Nome
                    <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    />
                </label>
                <label>Email
                    <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </label>
                <label>Senha
                    <input 
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    />
                </label>
                <button type="submit">Registrar</button>
            </form>
        </div>
    )
}