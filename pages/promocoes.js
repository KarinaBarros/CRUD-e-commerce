import Nav from "@/components/nav";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";

export default function NovaPromocao() {
    useAuth();
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [porcentagem, setPorcentagem] = useState();
    const [promocoes, setPromocoes] = useState([]);
    const [id, setId] = useState();
    const [showPromocoes, setShowpromocoes] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [promocao_id, setPromocaoId] = useState();
    const [produtosPromocao, setProdutosPromocao] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const [nomePromocao, setNomePromocao] = useState('Escolha uma promoção');

    const novaPromocao = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post('/api/nova-promocao', { nome, descricao, porcentagem })
            alert(response.data.message);
            window.location.reload();
        } catch (err) {
            alert(err.response.data.message);
        }
    }

    const fetchPromocoes = async () => {
        try {
            const response = await axios.get('/api/promocoes');
            setPromocoes(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchProdutos = async () => {
        try {
            const response = await axios.get('/api/produtos-em-promocao');
            setProdutos(response.data);
            setPesquisa('');
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchPromocoes();
        fetchProdutos();
    }, [])

    const excluirPromocao = async (event) => {
        event.preventDefault();
        const confirmar = confirm('Você tem certeza que deseja excluir esta promoção?');
        if (!confirmar) {
            return;
        }
        try {
            const response = await axios.post('/api/excluir-promocao', { id });
            alert(response.data.message);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    const ShowPromocao = () => {
        setShowpromocoes(!showPromocoes);
    }

    const fetchProdutosPromocao = async (promocao_id) => {
        try {
            const response = await axios.post('/api/produtos-da-promocao', { promocao_id });
            setProdutosPromocao(response.data);
            setShowpromocoes(false);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchPesquisa = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/promocao-pesquisa', { pesquisa });
            setProdutos(response.data);
        } catch (err) {
            console.log(err.response.data.message);
        }
    }

    const incluirPromocao = async (id) => {
        if (!promocao_id) {
            alert('Escolha uma promoção');
        } else {
            try {
                const response = await axios.post('/api/incluir-promocao', { promocao_id, id });
                alert(response.data.message);
                fetchProdutosPromocao(promocao_id);
                if(pesquisa){
                    fetchPesquisa(event);
                }else{
                    fetchProdutos();
                }
            } catch (err) {
                alert(err.response.data.message);
            }
        }

    }

    const excluirDaPromocao = async (id) => {
        try {
            const response = await axios.post('/api/retirar-promocao', { id });
            alert(response.data.message);
            fetchProdutosPromocao(promocao_id);
                if(pesquisa){
                    fetchPesquisa(event);
                }else{
                    fetchProdutos();
                }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex h-full">
            <Nav />
            <div className='flex flex-col bg-primary w-full h-screen '>
                <h2 className="mt-4 mx-auto w-2/3 text-center py-2 border border-solid border-black">Criar nova promoção.</h2>
                <form onSubmit={novaPromocao} className='flex w-2/3 mx-auto bg-primary w-full divide-x divide-solid divide-black border border-solid border-black'>
                    <label className="text-center pt-2">Nome da promoção:<br />
                        <input
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                            className="w-full p-1 border-t border-t-solid border-t-black "
                        />
                    </label>
                    <label className="text-center pt-2">Descrição:<br />
                        <input
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                            className="w-full p-1 border-t border-t-solid border-t-black "
                        />
                    </label>
                    <label className="text-center pt-2">Desconto %:<br />
                        <input
                            type='number'
                            value={porcentagem}
                            onChange={(e) => setPorcentagem(e.target.value)}
                            required
                            className="w-full p-1 border-t border-t-solid border-t-black "
                        />
                    </label>
                    <div className="flex">
                        <button type='submit' className="text-blue-800 mx-4">Criar</button>
                    </div>
                </form>
                <p className="mt-4 mx-auto w-2/3 text-center py-2 border border-solid border-black">Excluir Promocao</p>
                <form onSubmit={excluirPromocao} className='flex w-2/3 mx-auto bg-primary w-full divide-x divide-solid divide-black border border-solid border-black'>
                    <label className="w-1/2 text-center pt-2" >Escolha a promoção<br />
                        <select onChange={(e) => setId(e.target.value)} required className="w-full p-1 border-t border-t-solid border-t-black ">
                            <option></option>
                            {promocoes.map(promocao => (
                                <option
                                    key={promocao.id}
                                    value={promocao.id}
                                >{promocao.nome}</option>
                            ))}
                        </select>
                    </label><br /><br />
                    <div className="flex">
                        <button type='submit' className=" text-blue-800 ml-4">Excluir</button>
                    </div>
                </form>
                <div className="flex">
                    <div className="flex flex-col w-1/2">
                        <button onClick={ShowPromocao} className="pt-4">{nomePromocao}</button>
                        {showPromocoes && (
                            <div className='bg-primary flex flex-col absolute mt-8 ml-32'>
                                {promocoes.map(promocao => (
                                    <button
                                        key={promocao.id}
                                        className="ml-0 mr-auto"
                                        onClick={async () => { setNomePromocao(promocao.nome); setPromocaoId(promocao.id); fetchProdutosPromocao(promocao.id); }}
                                    >{promocao.nome}</button>
                                ))}
                            </div>
                        )}
                        {produtosPromocao.length > 0 && (
                            <table>
                                <thead >
                                    <tr>
                                        <th className="w-16">Número</th>
                                        <th className="w-16">Nome</th>
                                        <th className="w-16">Preço</th>
                                        <th className="w-32">Preço com desconto</th>
                                        <th className="w-16"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {produtosPromocao.map(produto => (
                                        <tr key={produto.id}>
                                            <td>{produto.id}</td>
                                            <td>{produto.nome}</td>
                                            <td>R$ {produto.preco}</td>
                                            <td>R$ {produto.total_desconto}</td>
                                            <td>
                                                <button onClick={() => { excluirDaPromocao(produto.id); }}>Excluir</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className="flex flex-col w-1/2">
                        <div className="flex mt-4">
                            <button onClick={fetchProdutos}>Todos os produtos</button>
                            <form onSubmit={fetchPesquisa}>
                                <input
                                    value={pesquisa}
                                    onChange={(e) => setPesquisa(e.target.value)}
                                    required
                                />
                                <button type='submit'>Pesquisar</button>
                            </form>
                        </div>
                        <table>
                            <thead >
                                <tr>
                                    <th className="w-16">Número</th>
                                    <th className="w-16">Nome</th>
                                    <th className="w-16">Preço</th>
                                    <th className="w-32">Preço com desconto</th>
                                    <th className="w-16"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {produtos.map(produto => (
                                    <tr key={produto.id}>
                                        <td>{produto.id}</td>
                                        <td>{produto.nome}</td>
                                        <td>R$ {produto.preco}</td>
                                        <td>R$ {produto.total_desconto}</td>
                                        <td>
                                            <button onClick={() => { incluirPromocao(produto.id); }}>Incluir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}