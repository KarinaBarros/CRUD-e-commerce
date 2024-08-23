import '@/app/globals.css';
import Nav from "@/components/nav";
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Produtos() {
    useAuth();
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [estoque, setEstoque] = useState('');
    const [idCategoria, setidCategoria] = useState('');
    const [imagem_principal, setImagem] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [showCategorias, setShowCategorias] = useState(null);
    const [colorProdutos, setColorProdutos] = useState('bg-blue-800');
    const [colorCategoria, setColorCategoria] = useState('bg-white');
    const [pesquisa, setPesquisa] = useState('');
    const [colorPesquisa, setColorPesquisa] = useState('bg-white');
    const [colorEstoque, setColorEstoque] = useState('bg-white');
    const [id_categoria, setIdCategoria] = useState();
    const [id, setId] = useState();
    const [novoEstoque, setNovoEstoque] = useState({});
    const [novoPreco, setNovoPreco] = useState({});
    const [nomeCategoria, setNomeCategoria] = useState('Produto por categoria');

    const fetchProdutos = async () => {
        setColorProdutos('bg-blue-800');
        setColorPesquisa('bg-white');
        setColorCategoria('bg-white');
        setColorEstoque('bg-white');
        setShowCategorias(null);
        setNomeCategoria('Produto por categoria');
        setPesquisa('');
        try {
            const response = await axios.get('/api/produtos');
            setProdutos(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchCategorias = async() =>{
        try {
            const response = await axios.get('/api/categorias');
            setCategorias(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchProdutos();
        fetchCategorias();
    }, []);

    const insertData = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('descricao', descricao);
        formData.append('preco', preco);
        formData.append('estoque', estoque);
        formData.append('id_categoria', idCategoria);
        if (imagem_principal) {
            formData.append('imagem_principal', imagem_principal);
        }

        try {
            const response = await axios.post('/api/novo-produto', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data.message);

            setNome('');
            setDescricao('');
            setEstoque('');
            setPreco('');
            setImagem(null);
            setidCategoria('');

            if(colorProdutos === 'bg-blue-800'){
                fetchProdutos();
            }
            if(colorPesquisa === 'bg-blue-800'){
                fetchPesquisa(event);
            }
            if(colorCategoria === 'bg-blue-800'){
                fetchCategoria(id_categoria);
            }
            if(colorEstoque === 'bg-blue-800'){
                fetchEstoque();
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Erro ao inserir produto');
        }
    }


    const Excluir = async (id) => {
        const confirmar = confirm('Você tem certeza que deseja excluir este item?');

        if (!confirmar) {
            // Se o usuário clicar em "Cancelar", não faz nada
            return;
        }
        try {
            const response = await axios.post('/api/excluir-produto', { id });
            alert(response.data.message);
            
            if(colorProdutos === 'bg-blue-800'){
                fetchProdutos();
            }
            if(colorPesquisa === 'bg-blue-800'){
                fetchPesquisa(event);
            }
            if(colorCategoria === 'bg-blue-800'){
                fetchCategoria(id_categoria);
            }
            if(colorEstoque === 'bg-blue-800'){
                fetchEstoque();
            }
        } catch (err) {
            alert(err.response.data.message);
        }
    }

    const ShowCategorias = () => {
        setShowCategorias(!showCategorias);
    }

    
    const fetchCategoria = async(id_categoria) => {
        setColorProdutos('bg-white');
        setColorPesquisa('bg-white');
        setColorCategoria('bg-blue-800');
        setColorEstoque('bg-white');
        setShowCategorias(null);
        setPesquisa('');
        try {
            const response = await axios.post('/api/produto-categoria', { id_categoria });
            setProdutos(response.data);
        } catch (err) {
            console.log(err);
        }
    }


    const fetchPesquisa = async(event) => {
        event.preventDefault();
        setColorProdutos('bg-white');
        setColorPesquisa('bg-blue-800');
        setColorCategoria('bg-white');
        setColorEstoque('bg-white');
        setNomeCategoria('Produto por categoria');
        setShowCategorias(null);
        try {
            const response = await axios.post('/api/produto-pesquisa', { pesquisa });
            setProdutos(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleEstoqueChange = (id, value) => {
        setNovoEstoque(prevEstoque => ({
            ...prevEstoque,
            [id]: value
        }));
    }

    const fetchEstoque = async() => {
        setColorProdutos('bg-white');
        setColorPesquisa('bg-white');
        setColorCategoria('bg-white');
        setColorEstoque('bg-blue-800');
        setShowCategorias(null);
        setNomeCategoria('Produto por categoria');
        setPesquisa('');
        try{
            const response = await axios.get('/api/estoque-baixo');
            setProdutos(response.data);
        }catch (err) {
            console.log(err);
        }
    }

    const NovoEstoque = async(event) => {
        event.preventDefault();
        try{
            const response = await axios.post('/api/novo-estoque', {estoque: novoEstoque[id], id});
            alert(response.data.message);
            setNovoEstoque('');
            if(colorProdutos === 'bg-blue-800'){
                fetchProdutos();
            }
            if(colorPesquisa === 'bg-blue-800'){
                fetchPesquisa(event);
            }
            if(colorCategoria === 'bg-blue-800'){
                fetchCategoria(id_categoria);
            }
            if(colorEstoque === 'bg-blue-800'){
                fetchEstoque();
            }
        }catch(err){
            console.log(err);
        }
    }

    const handlePrecoChange = (id, value) => {
        setNovoPreco(prevPreco => ({
            ...prevPreco,
            [id]: value
        }));
    }

    const NovoPreco = async(event) => {
        event.preventDefault();
        try{
            const response = await axios.post('/api/novo-preco', {preco: novoPreco[id], id});
            alert(response.data.message);
            setNovoPreco('');
            if(colorProdutos === 'bg-blue-800'){
                fetchProdutos();
            }
            if(colorPesquisa === 'bg-blue-800'){
                fetchPesquisa(event);
            }
            if(colorCategoria === 'bg-blue-800'){
                fetchCategoria(id_categoria);
            }
            if(colorEstoque === 'bg-blue-800'){
                fetchEstoque();
            }
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="flex h-full">
            <Nav />
            <div className='flex flex-col gap-2 h-screen overflow-hidden'>
            <div className='flex flex-col bg-white bg-primary'>
                <div className='flex bg-primary pb-4'>
                <p className='mx-auto'>Novo produto</p>
                </div>
                <form className="flex bg-primary divide-black divide-x divide-solid border border-solid border-black" onSubmit={insertData}>
                    <label className='text-center'>Nome<br/>
                        <input
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                            className='p-2'
                        />
                    </label>
                    <label className='text-center'>Descrição<br/>
                        <input
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                            className='p-2'
                        />
                    </label>
                    <label className='text-center'>Estoque<br/>
                        <input
                            value={estoque}
                            type="number"
                            onChange={(e) => setEstoque(e.target.value)}
                            className='p-2 w-32'
                        />
                    </label>
                    <label className='text-center'>Categoria<br/>
                        <select 
                            value={idCategoria}
                            onChange={(e) => setidCategoria(e.target.value)}
                            required
                            className='p-2 w-40'
                        >
                            <option></option>
                            {categorias.map(categoria => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nome}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className='text-center'>Preço<br/>
                        <input
                            value={preco}
                            type="number"
                            onChange={(e) => setPreco(e.target.value)}
                            required
                            className='p-2  w-32'
                        />
                    </label>
                    <label className='block text-center justify-center'>Imagem<br/>
                        <input
                            type="file"
                            onChange={(e) => setImagem(e.target.files[0])}
                            required
                            className='w-32'
                        /><br/>{imagem_principal ? (<div className='bg-white'>{imagem_principal.name}</div>) : (<div className='bg-white'>Nenhum arquivo</div>)}
                    </label>
                    <div className='flex'> 
                    <button type="submit" className='text-blue-800 ml-8'>Inserir produto</button>
                    </div>
                </form>
            </div>
                <div className='flex bg-white gap-8'>
                    <button onClick={fetchProdutos} className={colorProdutos}>Todos os produtos</button>
                    <div className={colorPesquisa}>
                        <form onSubmit={fetchPesquisa}>
                            <input
                                value={pesquisa}
                                onChange={(e) => setPesquisa(e.target.value)}
                                required
                            />
                            <button type='submit'>Pesquisar</button>
                        </form>
                    </div>
                    <div>
                        <button onClick={ShowCategorias} className={`w-40 ${colorCategoria}`}>{nomeCategoria}</button>
                        {showCategorias && (
                            <div className={'bg-primary flex flex-col absolute'}>
                                {categorias.map(categoria => (
                                    <button key={categoria.id} className='ml-0 mr-auto' onClick={async() => { setIdCategoria(categoria.id); setNomeCategoria(categoria.nome); fetchCategoria(categoria.id);}}>
                                        {categoria.nome}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button onClick={fetchEstoque} className={colorEstoque}>Produtos com estoque baixo</button>
                </div>
                <div className='overflow-auto'>
                    <table className='border-2 border-solid border-black'>
                        <thead>
                            <tr className='bg-gray-400 divide-black divide-x divide-solid '>
                                <th className='p-2' >Nome</th>
                                <th className='p-2'>Número</th>
                                <th className='p-2'>Descrição</th>
                                <th className='p-2'>Estoque</th>
                                <th className='p-2'>Categoria</th>
                                <th className='p-2'>Preço</th>
                                <th className='p-2'>Desconto</th>
                                <th className='p-2'>Total com desconto</th>
                                <th className='p-2'>Imagem</th>
                                <th className='p-2'></th>
                            </tr>
                        </thead>
                        <tbody >
                            {produtos.map(produto => (
                                <tr key={produto.id} className='divide-black divide-x divide-solid even:bg-gray-200'>
                                    <td className='w-32 p-1 text-center align-middle'>{produto.nome}</td>
                                    <td className='p-1 text-center align-middle'>{produto.id}</td>
                                    <td className='w-1/4 p-1 text-center align-middle'>{produto.descricao}</td>
                                    <td className='p-1 text-center align-middle'>
                                    <div className={produto.estoque > 9 ?('text-green-500'): ('text-red-500')}>{produto.estoque}</div>
                                        <form onSubmit={async() => {NovoEstoque(event);}}>
                                            <input
                                                placeholder='Novo estoque'
                                                className='border border-solid border-black rounded-sm w-24 p-1'
                                                value={novoEstoque[produto.id] || ''}
                                                onChange={(e) => {handleEstoqueChange(produto.id, e.target.value); setId(produto.id);}}
                                            />
                                            <button type='submit' className='text-blue-800'>Alterar</button>
                                        </form>
                                    </td>
                                    <td className='p-1 text-center align-middle'>{produto.categoria_nome}</td>
                                    <td className='p-1 text-center align-middle'>R$ {produto.preco}
                                        <form onSubmit={async() => {NovoPreco(event);}}>
                                            <input
                                                placeholder='Novo preço'
                                                className='border border-solid border-black rounded-sm w-24 p-1'
                                                value = {novoPreco[produto.id] || ''}
                                                onChange={(e) => {handlePrecoChange(produto.id, e.target.value); setId(produto.id);}}
                                            />
                                            <button type='submit' className='text-blue-800'>Alterar</button>
                                        </form>
                                    </td>
                                    {produto.promocao_porcentagem ? (<td className='p-1 text-center align-middle'>{produto.promocao_porcentagem}%</td>) : (
                                        <td className='p-1 text-center align-middle'>0</td>
                                    )}
                                    <td className='p-1 text-center align-middle'>R$ {produto.total_desconto}</td>
                                    <td className='p-1 text-center align-middle'><img className='w-16' src={produto.imagem_principal} alt={produto.nome} /></td>
                                    <td className='p-1 text-center align-middle'><button className='text-blue-800' onClick={async () =>{ Excluir(produto.id);}}>Excluir produto</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

