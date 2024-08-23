import Nav from "@/components/nav";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { useState } from "react";
import '@/app/globals.css';

export default function NovaCategoria(){
    useAuth();
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const insertData = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post('/api/nova-categoria', {nome, descricao});
            alert(response.data.message);
            setNome('');
            setDescricao('');
        }catch(err){
            alert(err.response.data.message);
        }
    }
    return(
        <div className="flex h-full">
            <Nav/>
            <div className="flex flex-col bg-primary w-full">
                <h2>Nova categoria</h2>
                <form className="flex flex-col gap-2" onSubmit={insertData}>
                    <label>Nome:<br/>
                        <input
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        />
                    </label>
                    <label>Descrição:<br/>
                        <input
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                        />
                    </label>
                    <button type="submit">Inserir Categoria</button>
                </form>
            </div>
        </div>
    )
}