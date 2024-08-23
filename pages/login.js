import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import '@/app/globals.css';

export default function Login(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const router = useRouter();

    const fetchData = async(event) => {
        event.preventDefault();
        try{
            const response = await axios.post('/api/login', {email, senha});
            const token = response.data.token;
            const nome =response.data.nome;
            localStorage.setItem('token', token);
            localStorage.setItem('nome', nome);
            console.log(response.data.message);
            router.push('/');
        }catch(err){
            alert(err.response.data.message);
        }
    }

    return(
        <div>
            <form onSubmit={fetchData}>
                <label >Email
                    <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label >Senha
                    <input 
                    type="password" 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}/>
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}